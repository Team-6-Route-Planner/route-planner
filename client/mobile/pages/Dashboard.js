import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Text, Image, TouchableNativeFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useQuery} from '@apollo/client'
import {myTrips, myUser, myOngoingTrip} from '../config'
import changeDate from '../helpers/changeDate'
import {Button} from 'react-native-elements'

const GET_USER = gql`
  query{
    user @client
  }
`

const GET_HISTORY_TRIPS = gql`
  query GetHistoryTripsById($UserId: String){
    getHistory(userId: $UserId){
      _id
      routes {_id lat lng address status arrivedAt}
      status
      userId
      startedAt
    }
  }
`

const GET_CURRENT_TRIPS = gql`
  query GetCurrentTripsById($UserId: String){
    getCurrentTrip(userId: $UserId){
      _id
      routes {_id lat lng address status arrivedAt}
      status
      userId
      startedAt
    }
  }
`

const GET_TRIPS = gql`
  query{
    trips @client
  }
`

export default ({navigation}) => {
  const user = myUser();
  const {loading, data, error} = useQuery(GET_USER, {
    onError: (err) => {
      console.log(err)
    }
  })
  
  const {data:historyTrips, loading: loadingHistoryTrips, error:errorTrips} = useQuery(GET_HISTORY_TRIPS,{
    variables: {
      UserId: user.id
    },
    onCompleted: (data) =>{
      const array = [].concat(data.getHistory).reverse()
      myTrips([...array])
    },
    pollInterval: 500
  })

  const {data:currentTrip, loading:loadingCurrentTrip} = useQuery(GET_CURRENT_TRIPS,{
    variables: {
      UserId: user.id
    },
    onCompleted: (data) =>{
        myOngoingTrip(data.getCurrentTrip)
      // } else{
        // myOngoingTrip(null)
      // }
    },
    pollInterval: 500
  })

  const [allTrips, setAllTrips] = useState([])

  // myTrips([...trip])
  useEffect(()=>{
    if(historyTrips){
      const array = [].concat(historyTrips.getHistory).reverse()
      setAllTrips(array)
      myTrips([...array])
    }
    return ()=>{}
  },[historyTrips])

  if(loading || loadingCurrentTrip || loadingHistoryTrips){
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if(error || errorTrips){
    return <Text>Error...</Text>
  }

  return (
    <ScrollView style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <View style={{
        position: 'absolute',
        height: 100,
        width: 100,
        top: 50,
        flex: 0,
        right: 30,
        bottom: 10,
        zIndex: 20
      }}>
        <Button
          buttonStyle={{
            backgroundColor: '#EE1234',
            borderRadius: 50,
          }}
          titleStyle={{
            fontSize: 16
          }}
          iconRight
          title="Logout"
          onPress={()=>{
            navigation.navigate('Login')
          }}
          />
      </View>
      <View style = {styles.greetingsBox}>
        <Image style={{
          height: 70,
          width: 70,
          marginBottom: 10,
          marginLeft: -10,
          borderRadius: 100
        }} source={require('../assets/no-photo.png')} />
        <Text style = {{
          ...styles.greetingsText,
          fontSize: 25
        }}>
          Hai,
        </Text>
        <Text style = {{
          ...styles.greetingsText,
          fontSize: 35,
          fontWeight: 'bold'
        }}>
          {data.user.name.split(' ')[0]}
        </Text>
        <TouchableNativeFeedback
        onPress={()=> {
          if(currentTrip.getCurrentTrip){
            navigation.navigate('Maps', {currentTrip: currentTrip.getCurrentTrip})
          }
        }}>
          <View style ={styles.statusBox}>
            {currentTrip.getCurrentTrip ? (
              <View style={{flexDirection: 'row'}}>
                <Image style={{
                  height: 120,
                  width: 100,
                  marginTop: 10,
                  marginBottom: 5,
                  marginLeft: 5,
                  borderRadius: 40
                }} source={require('../assets/on-delivery.png')} />
                <View style={{
                  marginHorizontal: 20,
                  flexDirection: 'column',
                  alignItems:'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Text style={{
                    color: '#3D73DD',
                    fontSize: 25,
                    width: 150,
                    fontWeight: 'bold',
                    textAlign: 'left'
                  }}>Order Masuk!</Text>
                  <Text style={{
                    width: 150,
                    textAlign: 'left',
                    fontSize: 13,
                    color: '#EE1234',
                    flexWrap: 'wrap'
                  }}>Tekan untuk menuju peta!</Text>
                </View>
              </View>
            ) : (
              <View>
                <View style={{flexDirection: 'row'}}>
                <Image style={{
                  height: 120,
                  width: 100,
                  marginBottom: 5,
                  marginLeft: 5,
                  borderRadius: 100
                }} source={require('../assets/nothing.png')} />
                <View style={{
                  marginRight: 20,
                  marginLeft: 10,
                  flexDirection: 'column',
                  alignItems:'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Text style={{
                    color: '#3D73DD',
                    fontSize: 25,
                    width: 145,
                    fontWeight: 'bold',
                    textAlign: 'left'
                  }}>Belum Ada Order</Text>
                </View>
              </View>
              </View>
            ) }
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{
        height: (styles.statusBox.marginBottom/2)*(-1)+40
      }} />
      <View style={{marginTop: 20}}>
        <Text style={{
          color: '#3D73DD',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Perjalananmu</Text>
        <Text style={{
          textAlign: 'center',
          color: '#3D73DD',
          textDecorationLine: 'underline',
          marginBottom:20
        }}
        onPress={()=> navigation.navigate('All Trips')}>
          {'lihat semua >'}
        </Text>
        {/* <Text>{JSON.stringify(allHistoryTrips.trips)}</Text> */}
        {currentTrip.getCurrentTrip && (
          <TouchableNativeFeedback
          // onPress={()=>navigation.navigate('Maps', {currentTrip: currentTrip.getCurrentTrip})}
          onPress={()=>navigation.navigate('Current Timeline', {trip: currentTrip.getCurrentTrip})}>
            <View style={styles.cardBox}>
                <Icon
              name="exclamation-circle"
              size={40}
              color="#EE1234"
              />
              <View style={{flexDirection:'column', alignItems: 'flex-end'}}>
                <Text style={{color: '#3D73DD', fontSize: 20}}>{changeDate(currentTrip.getCurrentTrip.startedAt)}</Text>
                <Text style={{color: '#EE1234', fontSize: 15}}>Perjalanan belum selesai!</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ) }
        {allTrips.map((trip, i)=>{
          if(i<=2){
            return (
              <TouchableNativeFeedback
              key={i}
              onPress={()=>navigation.navigate('Detail Trip', {trip})}>
                <View style={styles.cardBox}>
                  <Icon
                  name="check-circle"
                  size={40}
                  color="#30CB00"
                  />
                  <View style={{flexDirection:'column', alignItems: 'flex-end'}}>
                    <Text style={{color: '#3D73DD', fontSize: 20}}>{changeDate(trip.startedAt)}</Text>
                    <Text style={{color: 'grey', fontSize: 15}}>Waktu Selesai: {trip.routes[trip.routes.length-1].arrivedAt}</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            )
          }
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1
  },
  greetingsBox:{
    flex: 0,
    backgroundColor: '#3D73DD',
    height: 300,
    borderBottomLeftRadius:30,
    borderBottomEndRadius: 30,
    paddingHorizontal: 50,
    justifyContent: 'flex-end'
  },
  greetingsText:{
    color: 'white'
  },
  statusBox:{
    borderColor: '#3D73DD',
    borderWidth: 4,
    padding: 10,
    backgroundColor: '#ffffff',
    flex: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: -80,
    borderRadius: 30,
    width: 300,
    height: 150
  },
  cardBox:{
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
    width: 300,
    alignSelf: 'center',
    borderRadius: 20
  }
})
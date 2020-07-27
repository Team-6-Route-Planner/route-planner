import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Text, Image, TouchableNativeFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useQuery} from '@apollo/client'
import {myTrips, myUser, myOngoingTrip} from '../config'

const GET_USER = gql`
  query{
    user @client
  }
`

const GET_HISTORY_TRIPS = gql`
  query GetHistoryTripsById($UserId: String){
    getHistory(userId: $UserId){
      _id
      routes {lat lng address}
      status
      userId
    }
  }
`

const GET_CURRENT_TRIPS = gql`
  query GetCurrentTripsById($UserId: String){
    getCurrentTrip(userId: $UserId){
      _id
      routes {lat lng address}
      status
      userId
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
  
  const {data:historyTrips, error:errorTrips} = useQuery(GET_HISTORY_TRIPS,{
    variables: {
      UserId: user.id
    },
    onCompleted: (data) =>{
      myTrips([...data.getHistory])
    },
    pollInterval: 500
  })

  const {data:currentTrip, loading:loadingCurrentTrip} = useQuery(GET_CURRENT_TRIPS,{
    variables: {
      UserId: user.id
    },
    onCompleted: (data) =>{
      myOngoingTrip(data.getCurrentTrip)
    },
    pollInterval: 500
  })

  
  
  const {loading:loadingTrips, data:allHistoryTrips} = useQuery(GET_TRIPS,{
    pollInterval: 500
  })

  // myTrips([...trip])
  useEffect(()=>{
    return ()=>{}
  },[])

  if(loading || loadingCurrentTrip || loadingTrips){
    return <Text>Loading...</Text>
  }

  if(error || errorTrips){
    return <Text>Error...</Text>
  }

  const totalTrips = currentTrip.getCurrentTrip ? allHistoryTrips.trips.length + 1 : allHistoryTrips.trips.length;

  return (
    <ScrollView style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <View style = {styles.greetingsBox}>
        <Image style={{
          height: 70,
          width: 70,
          marginBottom: 10,
          marginLeft: -10,
          borderRadius: 100
        }} source={{
          uri: 'https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg'
        }} />
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
        <View style ={styles.statusBox}>
          <Text style={{
            textAlign: 'center',
            color: '#3D73DD',
            fontWeight: 'bold',
            fontSize: 20
          }}>Total Perjalananmu</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text style={{
              textAlign: 'center',
              color: '#3D73DD',
              fontWeight: 'bold',
              fontSize: 55
            }}>
              {(totalTrips) + ' '}
            </Text>
            <Text style={{
              textAlign: 'center',
              alignSelf:'flex-end',
              color: '#3D73DD',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10
            }}>
              perjalanan
            </Text>
          </View>
        </View>
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
          onPress={()=>navigation.navigate('Maps', {currentTrip: currentTrip.getCurrentTrip})}>
            <View style={styles.cardBox}>
                <Icon
              name="exclamation-circle"
              size={40}
              color="#EE1234"
              />
              <View style={{flexDirection:'column', alignItems: 'flex-end'}}>
                <Text style={{color: '#3D73DD', fontSize: 20}}>22 Juli 2020</Text>
                <Text style={{color: '#EE1234', fontSize: 15}}>Tekan untuk menuju peta!</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ) }
        {allHistoryTrips.trips.map((trip, i)=>{
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
                  <Text style={{color: '#3D73DD', fontSize: 20}}>22 Juli 2020</Text>
                  <Text style={{color: 'grey', fontSize: 15}}>Waktu Sampai: 10:20</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
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
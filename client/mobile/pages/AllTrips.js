import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useQuery} from '@apollo/client'
import {myOngoingTrip, myTrips, myUser} from '../config'
import Icon from 'react-native-vector-icons/FontAwesome';
import changeDate from '../helpers/changeDate'
import Back from '../components/Back'

const GET_TRIPS = gql`
  query{
    trips @client
  }
`

const GET_USER = gql`
  query{
    user @client
  }
`

const GET_HISTORY_TRIPS = gql`
  query GetHistoryTripsById($UserId: String){
    getHistory(userId: $UserId){
      _id
      routes {lat lng address status arrivedAt}
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
      routes {lat lng address status arrivedAt}
      status
      userId
      startedAt
    }
  }
`

const GET_ONGOING_TRIPS = gql`
  query{
    ongoingTrips @client
  }
`

export default ({navigation}) => {
  const user = myUser()
  const {loading, data:allHistoryTrips, error} = useQuery(GET_HISTORY_TRIPS,{
    variables: {
      UserId: user.id
    },
    onCompleted: (data) =>{
      myTrips([...data.getHistory])
    },
    pollInterval: 500
  })
  const {data: ongoingTrip} = useQuery(GET_CURRENT_TRIPS,{
    variables: {
      UserId: user.id
    },
    pollInterval: 500,
    onCompleted: (data) =>{
      // console.log(data.getCurrentTrip)
      // if(data.getCurrentTrip){
        myOngoingTrip(data.getCurrentTrip)
      // } else{
        // myOngoingTrip(null)
      // }
    },
  })

  useEffect(()=>{
    return ()=>{}
  },[])

  if(loading){
    return <Text>Loading...</Text>
  }

  if(error){
    return <Text>Error...</Text>
  }

  const renderItem = (data, index) => {
    return (
      <View style={styles.cardBox}>
        <Text style={{color: '#3D73DD', fontSize: 20}}>{data.item.name}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <Back navigation={navigation} color='#ffffff'/>
      <View style = {styles.greetingsBox}>
        <Text style = {{
          ...styles.greetingsText,
          fontSize: 35,
          fontWeight: 'bold'
        }}>
          Perjalananmu
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        {ongoingTrip.getCurrentTrip && (
          <TouchableNativeFeedback
          onPress={()=>navigation.navigate('Maps', {currentTrip: ongoingTrip.getCurrentTrip})}>
            <View style={styles.cardBox}>
                <Icon
              name="exclamation-circle"
              size={40}
              color="#EE1234"
              />
              <View style={{flexDirection:'column', alignItems: 'flex-end'}}>
                <Text style={{color: '#3D73DD', fontSize: 20}}>22 Juli 2020</Text>
                <Text style={{color: '#EE1234', fontSize: 15}}>Perjalanan belum selesai!</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
        {allHistoryTrips.getHistory.map((trip, i)=>{
          return (
            <TouchableNativeFeedback key={i}
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
    height: 200,
    borderBottomLeftRadius:50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 50,
    justifyContent: 'flex-end',
    padding: 20
  },
  greetingsText:{
    color: 'white'
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
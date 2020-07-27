import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useQuery} from '@apollo/client'
import {myOngoingTrip} from '../config'
import Icon from 'react-native-vector-icons/FontAwesome';

const GET_TRIPS = gql`
  query{
    trips @client
  }
`

const GET_ONGOING_TRIPS = gql`
  query{
    ongoingTrips @client
  }
`

export default ({navigation}) => {
  const {loading, data:allHistoryTrips, error} = useQuery(GET_TRIPS,{
    pollInterval: 500
  })
  const {data: ongoingTrip} = useQuery(GET_ONGOING_TRIPS,{
    pollInterval: 500
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
        {ongoingTrip && (
          <TouchableNativeFeedback
          onPress={()=>navigation.navigate('Maps', {currentTrip: ongoingTrip})}>
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
        )}
        {allHistoryTrips.trips.map((trip, i)=>{
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
                  <Text style={{color: '#3D73DD', fontSize: 20}}>20 Juli 2020</Text>
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
import React, {useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useQuery} from '@apollo/client'
import trip from '../fakeData'

const GET_TRIPS = gql`
  query{
    trips @client
  }
`

export default ({navigation}) => {
  const {loading, data:allHistoryTrips, error} = useQuery(GET_TRIPS)
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
    <View style={styles.container}>
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
        {allHistoryTrips.trips.map((trip, i)=>{
          return (
            <View style={styles.cardBox} key={i}>
              <Text style={{color: '#3D73DD', fontSize: 20}}>{'oyee'}</Text>
            </View>
          )
        })}
      </View>
    </View>
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
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
    width: 300,
    alignSelf: 'center',
    borderRadius: 20
  }
})
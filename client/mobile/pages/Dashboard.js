import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {Button} from 'react-native-elements'
import {gql, useQuery} from '@apollo/client'
import trip from '../fakeData'
import {myTrips} from '../config'

const GET_USER = gql`
  query{
    user @client
  }
`

export default ({navigation}) => {
  const {loading, data, error} = useQuery(GET_USER)
  myTrips([...trip])
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
    // console.log(trip)
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
              {trip.length + ' '}
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
      <Button
        buttonStyle={{backgroundColor: '#3D73DD', paddingHorizontal: 20, borderRadius: 20, marginVertical: 15}}
        icon = {
          <Icon
          name="gamepad"
          size={20}
          color="white"
          />
        }
        title="   To Maps"
        onPress={() => navigation.navigate('Maps')}
        />

      <View>
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
        <FlatList
         data={trip}
         keyExtractor = {(_, i) => i}
         renderItem = {renderItem}/>
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
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
    width: 300,
    alignSelf: 'center',
    borderRadius: 20
  }
})
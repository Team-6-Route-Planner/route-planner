import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import * as Permissions from 'expo-permissions'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {gql, useMutation} from '@apollo/client'
import Back from '../components/Back'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import useInterval from '../components/useInterval'
const API_KEY = 'AIzaSyCyNsE0LjFJCgGeT4sJoQFsVZmrCXaw79o'

const SEND_POSITION_INTERVAL = gql`
  mutation UpdateLocation($userId: String, $lat: Float, $lng: Float) {
    updateLocation(
      userId: $userId,
      lat: $lat,
      lng: $lng
    ){
      _id
      username
      lat
      lng
    }
  }
`


export default ({route, navigation}) => {
  const {currentTrip} = route.params
  const [myPosition, setMyPosition] = useState({
    latitude: null,
    longitude: null
  });

  const [updateMyPosition] = useMutation(SEND_POSITION_INTERVAL)

  const [distanceAndDuration, setDistanceAndDuration] = useState({
    distance: 0,
    duration: 0
  })
  

  const waypoint = () => {
    const waypoint = currentTrip.routes.slice(1,-1).map(coordinate=>{
      return {
        latitude: coordinate.lat,
        longitude: coordinate.lng
      }
    })

    // console.log(waypoint)

    return waypoint
  }

  // const wayPoint = {
  //   latitude: -6.2566627,
  //   longitude: 106.7719658

  // }

  const getPosition = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if(status !== 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}})=> {
        // console.log(latitude, longitude)
        setMyPosition({latitude,longitude})
        updateMyPosition({
          variables: {
            userId: currentTrip.userId,
            lat: latitude,
            lng: longitude
          }
        })
      },
      (error)=>console.log(error)
    )
  }

  // useInterval(()=>{
  //   getPosition()
  // }, 1000)

  useEffect(()=>{
    getPosition()
  },[getPosition])

  useEffect(()=>{
    return ()=> {}
  },[])


  return (
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <Back navigation={navigation} color='#3D73DD'/>
      {myPosition.latitude && (
        <View>
          <MapView
          showsUserLocation
          style={styles.mapStyle}
          initialRegion={{
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <Marker
              coordinate={{
                latitude:currentTrip.routes[0].lat,
                longitude: currentTrip.routes[0].lng
              }}
              title={currentTrip.routes[0].address}
            />
            <Marker
              coordinate={{
                latitude:currentTrip.routes[currentTrip.routes.length-1].lat,
                longitude: currentTrip.routes[currentTrip.routes.length-1].lng
              }}
              title={currentTrip.routes[currentTrip.routes.length-1].address}
            />
            {currentTrip.routes.length > 2 && (
              <View>
                {currentTrip.routes.slice(1,-1).map((coordinate, i)=>{
                  return (
                    <Marker key={i}
                    coordinate={{
                      latitude:coordinate.lat,
                      longitude: coordinate.lng
                    }}
                    title={coordinate.address}/>
                  )
                })}
              </View>
            )}
            <MapViewDirections 
              origin={{
                latitude: currentTrip.routes[0].lat,
                longitude: currentTrip.routes[0].lng
              }}
              destination={{
                latitude: currentTrip.routes[currentTrip.routes.length-1].lat,
                longitude: currentTrip.routes[currentTrip.routes.length-1].lng
              }}
              waypoints = {waypoint()}
              apikey={API_KEY}
              strokeWidth={4}
              strokeColor="#3D73DD"
              // optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result)=>{
                setDistanceAndDuration({
                  distance: result.distance,
                  duration: result.duration
                })
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
              }}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR');
              }}
            />
          </MapView>
          <View style={styles.statisticBox}>
            <View style={{justifyContent: 'space-around'}}>
              <Text style={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  Jarak
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 50,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                  {Math.floor(distanceAndDuration.distance)}
                </Text>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10
                  }}>
                    {' km'}
                  </Text>
              </View>       
            </View>
            <View style={{height: 125, width: 5, backgroundColor: '#ffffff', alignSelf: 'center', marginHorizontal: -30}} />
            <View style={{justifyContent: 'space-around'}}>
              <Text style={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  Total Durasi
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 50,
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {Math.floor(distanceAndDuration.duration)}
                </Text>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 10
                }}>
                  {' menit'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  mapStyle: {
    marginTop: 20,
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height)-170,
  },
  statisticBox:{
    flexDirection: 'row',
    borderWidth: 5,
    borderColor: '#ffffff',
    justifyContent: 'space-around',
    height: 170,
    backgroundColor: '#3D73DD',
    marginTop: -5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10
  }
});
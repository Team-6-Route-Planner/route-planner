import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import * as Permissions from 'expo-permissions'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Polyline from '@mapbox/polyline'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
const API_KEY = 'AIzaSyCyNsE0LjFJCgGeT4sJoQFsVZmrCXaw79o'


export default ({route}) => {
  const {currentTrip} = route.params
  const [myPosition, setMyPosition] = useState({
    latitude: null,
    longitude: null
  });
  

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
      },
      (error)=>console.log(error)
    )
  }

  useEffect(()=>{
    getPosition()

    const abortController = new AbortController()

    return ()=> {abortController.abort()}
  },[getPosition])

  return (
    <View style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      {myPosition.latitude && (
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
            title={"from here"}
          />
          <Marker
            coordinate={{
              latitude:currentTrip.routes[currentTrip.routes.length-1].lat,
              longitude: currentTrip.routes[currentTrip.routes.length-1].lng
            }}
            title={"to here"}
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
                  title={`waypoints ${i+1}`}/>
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
            strokeWidth={3}
            strokeColor="blue"
            // optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={(result)=>{
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
          />
        </MapView>
        )}
      <Text>Oyee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  mapStyle: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height)-100,
  },
});
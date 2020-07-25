import React, {useState, useEffect} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import * as Permissions from 'expo-permissions'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Polyline from '@mapbox/polyline'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
const API_KEY = 'AIzaSyCyNsE0LjFJCgGeT4sJoQFsVZmrCXaw79o'


export default ({coordinates}) => {
  const [myPosition, setMyPosition] = useState({
    latitude: null,
    longitude: null
  });
  

  const position = [{
    name: 'Hacktiv8',
    address: 'Jl. Sultan Iskandar Muda No.7, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
    latitude: -6.2652709,
    longitude: 106.7767303
  },{
    name: 'Hacktiv8',
    address: 'Jl. Sultan Iskandar Muda No.7, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
    latitude: -6.2576627,
    longitude: 106.7919658
  }]

  const wayPoint = {
    latitude: -6.2566627,
    longitude: 106.7719658

  }

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
  },[getPosition])

  useEffect(()=>{
    return () => {};
  })

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
          {/* <Marker draggable
            coordinate={{
              latitude:coordinates[0].latitude,
              longitude: coordinates[0].longitude
            }}
            title={"I'm here"}
          />
          <Marker draggable
            coordinate={{
              latitude:coordinates[coordinates.length-1].latitude,
              longitude: coordinates[coordinates.length-1].longitude
            }}
            title={"Go here"}
          /> */}
          {/* {coordinates.length > 2 && (
            <View>
              {coordinates.slice(1,-1).map(coordinate=>{
                <Marker draggable
                coordinate={{
                  latitude:coordinate.latitude,
                  longitude: coordinate.longitude
                }}
                title={"waypoints"}/>
              })}
            </View>
          )} */}
          <Marker
            title={position[0].name}
            // description= {position[0].address}
            coordinate={{
              latitude:position[0].latitude,
              longitude: position[0].longitude
            }}
            calloutOffset={{x: 0, y: 0}}
          />
          <Marker
            title={position[position.length-1].name}
            // description= {position[position.length-1].address}
            coordinate={{
              latitude:position[position.length-1].latitude,
              longitude: position[position.length-1].longitude
            }}
          />
          {/* <MapViewDirections 
          origin={myPosition}
          destination={destPosition}
          waypoints = {[wayPoint]}
          apikey={API_KEY}
          strokeWidth={3}
          strokeColor="blue"
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}
          onReady={(result)=>console.log(result)}
          onError={(errorMessage) => {
            console.log('GOT AN ERROR');
          }}
          /> */}
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
import React from 'react';
import {View, Image, Dimensions} from 'react-native'
const { width, height} =Dimensions.get('window')

export default () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor: '#3D73DD'}}>
      <View style={{
        position: 'absolute',
        top: 275,
        left: 105,
      }}>
        <Image style={{
          height: 200,
          width: 200,
        }} source={require('../assets/routemaster.png')} />
      </View>
    </View>
  )
}
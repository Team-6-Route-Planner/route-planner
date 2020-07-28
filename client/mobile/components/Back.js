import React from 'react';
import {View, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default ({navigation, color, isMap}) => {
  return (
    <View style={{
      position: 'absolute',
      height: 50,
      width: 50,
      top: isMap ? 75 : 30,
      flex: 0, 
      left: isMap ? 15 : 20,
      right: 0,
      bottom: 0,
      zIndex: 20
    }}>
        <Icon
        name="arrow-circle-left"
        size={isMap ? 38 : 40}
        color={color}
        onPress={()=> navigation.goBack()}
        />
    </View>
  )
}
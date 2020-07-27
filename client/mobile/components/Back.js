import React from 'react';
import {View, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default ({navigation, color}) => {
  return (
    <View style={styles.container}>
        <Icon
        style
        name="arrow-circle-left"
        size={40}
        color={color}
        onPress={()=> navigation.goBack()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    height: 50,
    width: 50,
    flex: 0, 
    top: 30,
    left: 20,
    right: 0,
    bottom: 0,
    zIndex: 20
  }
})
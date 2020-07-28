import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

export default (props) => {
  const currentLocation = props.currentLocation ?  props.currentLocation : console.log(`it doesn't work properly`)
  return (
    <View style={[styles.container, {top: 50}]}>
        <MaterialIcons
            name="my-location"
            color="#000"
            size={25}
            onPress={() => { currentLocation() }}
        />
    </View>
  )
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    width: 45,
    height: 45,
    top: 110,
    left: (WIDTH-70),
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 7,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 1.0,
    opacity: 0.8
  },
})
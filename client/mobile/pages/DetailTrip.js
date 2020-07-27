import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import TimelineTrip from '../components/TimelineTrip'
import Back from '../components/Back'

export default ({navigation, route}) => {
  const {trip} = route.params;

  return (
      <ScrollView style={styles.container}>
        <Back navigation={navigation} color='#ffffff'/>
        <View style={styles.greetingsBox}>
          <Text style = {{
              ...styles.greetingsText,
              fontSize: 35,
              fontWeight: 'bold'
            }}>
              22 Juli 2020
          </Text>
        </View>
        <TimelineTrip trip = {trip} />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
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
})
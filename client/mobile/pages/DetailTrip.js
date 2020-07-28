import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import TimelineTrip from '../components/TimelineTrip'
import Back from '../components/Back'
import changeDate from '../helpers/changeDate'

export default ({navigation, route}) => {
  const {trip} = route.params;

  return (
      <View style={styles.container}>
        <Back navigation={navigation} color='#ffffff'/>
        <View style={styles.greetingsBox}>
          <Text style = {{
              ...styles.greetingsText,
              fontSize: 35,
              fontWeight: 'bold'
            }}>
              {changeDate(trip.startedAt)}
          </Text>
        </View>
        <View style={{flex:1}}>
          <TimelineTrip trip = {trip} />
        </View>
      </View>
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
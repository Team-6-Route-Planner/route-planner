import React from 'react';
import Timeline from 'react-native-timeline-flatlist'
import {Text, View} from 'react-native'

export default ({trip}) => {
  const modifiedKeyTrip = trip.routes.map((point, i)=>{
    if(i===0){
      return {
        time: point.arrivedAt,
        title: 'Start',
        description: point.address
      }
    } else if(i === trip.routes.length - 1){
      return {
        time: point.arrivedAt,
        title: 'End',
        description: point.address
      }
    } else{
      return {
        time: point.arrivedAt,
        title: `Waypoint ${i}`,
        description: point.address
      }
    }
  })

  return (
      <Timeline data={modifiedKeyTrip}
      detailContainerStyle={{
        marginTop: -5
      }}
      style={{flex: 1}}
      circleSize={20}
      circleColor='#3D73DD'
      innerCircle={'dot'}
      lineColor='#3D73DD'
      titleStyle={{color: '#3D73DD'}}
      timeContainerStyle={{minWidth:52, marginTop: 0}}
      timeStyle={{textAlign: 'center', backgroundColor:'#3D73DD', color:'white', padding:5, borderRadius:13}}
      descriptionStyle={{color:'gray'}}
      options={{
        renderHeader(){
          return (
            <View style={{flex: 1}}>
              <Text style={{fontSize: 30, marginTop: 230}}>sdfmkdsmflskdmklm</Text>
            </View>
          )
        },
        removeClippedSubviews: false,
        style:{paddingHorizontal: 30, paddingTop: 20},
      }}/>
    
  )
}
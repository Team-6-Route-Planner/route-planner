import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {gql, useMutation, useQuery} from '@apollo/client'
import {myUser} from '../config'
import changeDate from '../helpers/changeDate'
import Back from '../components/Back'
import Icon from 'react-native-vector-icons/FontAwesome';

const EDIT_ROUTE = gql`
  mutation EditRoute($userId: String, $routeId: String, $status: String, $arrivedAt: String){
    editRoute(userId: $userId, routeId: $routeId, status: $status, arrivedAt: $arrivedAt){
      _id
    }
  }
`
const GET_CURRENT_TRIPS = gql`
  query GetCurrentTripsById($UserId: String){
    getCurrentTrip(userId: $UserId){
      id:_id
      routes {_id lat lng address status arrivedAt}
      status
      userId
    }
  }
`

const EDIT_TRIP_SUCCESS = gql`
  mutation EditTrip($tripId: ID, $status: Boolean){
    editTrip(
      _id: $tripId,
      status: $status
    ){
      _id
      userId
      status
      routes {address}
    }
  }
`



export default ({route, navigation}) => {
  const user = myUser()
  const [editRoute] = useMutation(EDIT_ROUTE,{
    refetchQueries:{
      query: GET_CURRENT_TRIPS,
      variables: {
        userId: user.id
      },
      pollInterval: 500
    }
  })

  const [EditTripSuccess] = useMutation(EDIT_TRIP_SUCCESS,{
    onCompleted: () =>{
      navigation.navigate('Dashboard')
    }
  })

  const {data, loading} = useQuery(GET_CURRENT_TRIPS, {
    variables: {
      userId: user.id
    },
    pollInterval: 500
  })

  if(loading){
    return (
      <Text>Loading...</Text>
    )
  }

  const {trip} = route.params
  const modifiedKeyTrip = trip.routes.map((point, i)=>{
    if(i===0){
      return {
        id: point._id,
        title: 'Start',
        description: point.address,
        status: point.status
      }
    } else if(i === trip.routes.length - 1){
      return {
        id: point._id,
        title: 'End',
        description: point.address,
        status: point.status
      }
    } else{
      return {
        id: point._id,
        title: `Waypoint ${i}`,
        description: point.address,
        status: point.status
      }
    }
  })

  return (
    <ScrollView style={styles.container}>
      <Back navigation={navigation} color='#ffffff'/>
      <View style = {styles.greetingsBox}>
        <Text style = {{
          ...styles.greetingsText,
          fontSize: 35,
          fontWeight: 'bold'
        }}>
          {changeDate(trip.startedAt)}
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 50}}>
        {modifiedKeyTrip.map((route, i)=>{
          return (
            <View key={route.id} style={{flex:1, flexDirection:'row', marginTop: -10, marginBottom: 20, justifyContent: 'center'}}>
              <View style={{flexDirection:'column', width: 200}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3D73DD'}}>{route.title}</Text>
                <View>
                  <Text style={{fontSize:14, color: 'grey'}}>{route.description}</Text>
              </View>
              </View>
              <View style={{alignSelf: 'center', marginLeft: 20}}>
                <Button
                disabled = {route.status === 'arrived' ? true : false}
                disabledStyle = {{
                  backgroundColor: 'white',
                }}

                icon = { route.status === 'arrived' ? (
                  <Icon
                  name="check-circle"
                  size={20}
                  color="#30CB00"
                  />
                ) : null
                }
                title={ route.status==='arrived'? ' selesai' : "ongoing"}
                buttonStyle={{
                  backgroundColor: route.status==='arrived'? '#30CB00' : '#3D73DD'
                }}
                onPress={()=>{
                  if(i===0){
                    const date = new Date()
                    const time = date.getHours() + ':' + date.getMinutes()
                    editRoute({
                      variables:{
                        userId: user.id,
                        routeId: route.id,
                        status: 'arrived',
                        arrivedAt: time
                      }
                    })
                  } else if(modifiedKeyTrip[i-1].status === 'arrived'){
                    const date = new Date()
                    const time = date.getHours() + ':' + date.getMinutes()
                    editRoute({
                      variables:{
                        userId: user.id,
                        routeId: route.id,
                        status: 'arrived',
                        arrivedAt: time
                      }
                    })
                    if(i === modifiedKeyTrip.length-1){
                      // console.log(trip._id)
                      EditTripSuccess({
                        variables:{
                          tripId: trip._id,
                          status: true
                        }
                      })
                    }
                  } else{
                    console.log('sebelumnya belum tuh')
                  }
                }}/>
              </View>
            </View>
          )
        })}
      </View>
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
  buttonArrived:{
    backgroundColor: '#3D73DD'
  }
})
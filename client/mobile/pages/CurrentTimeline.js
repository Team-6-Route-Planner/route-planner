import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import {gql, useMutation, useQuery} from '@apollo/client'
import {myUser} from '../config'
import changeDate from '../helpers/changeDate'
import Back from '../components/Back'
import Icon from 'react-native-vector-icons/FontAwesome';
import { set } from 'react-native-reanimated';

const EDIT_ROUTE = gql`
  mutation EditRoute($userId: String, $routeId: String, $status: String, $arrivedAt: String){
    editRoute(userId: $userId, routeId: $routeId, status: $status, arrivedAt: $arrivedAt){
      _id
    }
  }
`
const GET_CURRENT_TRIPS = gql`
  query GetCurrentTripsById($userId: String){
    getCurrentTrip(userId: $userId){
      _id
      routes {_id lat lng address status arrivedAt}
      status
      userId
      startedAt
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
      onCompleted: (data) => {
        setTrip(data.getCurrentTrip)
      }
    }
  })

  const currentTrip = route.params.trip
  const [trip, setTrip] = useState([])
  useEffect(()=>{
    setTrip(currentTrip)
  }, [currentTrip])


  // console.log(trip)
  const [EditTripSuccess] = useMutation(EDIT_TRIP_SUCCESS,{
    onCompleted: () =>{
      navigation.navigate('Dashboard')
    }
  })

  // console.log(data.getCurrentTrip

  // const {trip} = route.params
  // if(data.getCurrentTrip){
    
  // }
  const onPress = (i, routeId) => {
    if(i===0){
      const date = new Date()
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const time = hours + ':' + minutes;
      // console.log(time)
      editRoute({
        variables:{
          userId: user.id,
          routeId: routeId,
          status: 'arrived',
          arrivedAt: time
        }
      })

      const newRoutes = trip.routes.map((route, j)=>{
        if(i===j){
          return {...route, status: 'arrived'}
        } else{
          return route
        }
      })

      setTrip({...trip, routes: newRoutes})

    } else if(trip.routes[i-1].status === 'arrived'){
      const date = new Date()
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      const time = hours + ':' + minutes;
      editRoute({
        variables:{
          userId: user.id,
          routeId: routeId,
          status: 'arrived',
          arrivedAt: time
        }
      })

      const newRoutes = trip.routes.map((route, j)=>{
        if(i===j){
          return {...route, status: 'arrived'}
        } else{
          return route
        }
      })

      setTrip({...trip, routes: newRoutes})

      if(i === trip.routes.length-1){
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
  }

  return (
    <ScrollView style={styles.container}>
      <Back navigation={navigation} color='#ffffff'/>
      <View>
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
          {trip.routes && (
            <View>
              {trip.routes.map((route, i)=>{
                return (
                  <View key={route._id} style={{flex:1, flexDirection:'row', marginTop: -10, marginBottom: 20, justifyContent: 'center'}}>
                    <View style={{flexDirection:'column', width: 200}}>
                      <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3D73DD'}}>{i=== 0 ? `Titik Mulai` : `Titik ${i}`}</Text>
                      <View>
                        <Text style={{fontSize:14, color: 'grey'}}>{route.address}</Text>
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
                      onPress={()=> onPress(i, route._id)}/>
                    </View>
                  </View>
                  )
                })}    
            </View>
          )}
          </View>
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
import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TextInput, Image} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import {gql, useMutation} from '@apollo/client'
import {myUser, myToken} from '../config'

const LOGIN = gql`
  mutation Login($username: String, $password: String, $deviceToken: String){
    login(username: $username, password: $password, deviceToken: $deviceToken){
      id:_id
      name:username
    }
  }
`


export default ({navigation}) => {
  const token = myToken()
  const [name, setName] = useState('');
  const [password, setPassword] = useState('')

  const [loginCheck] = useMutation(LOGIN,{
    onCompleted: (data)=>{
      myUser(data.login)
      navigation.navigate('Dashboard')
      setName('')
      setPassword('')
    },
    onError(err){
      console.log(err)
    }
  })

  const onPress = () =>{
    loginCheck({
      variables:{
        username:name,
        password,
        deviceToken: token
      }
    })
    // .then(_=>{
      // navigation.navigate('Dashboard') // temporary
    // })
  }

  return (
    <View style ={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <Image style={{
          // position: 'absolute',
          height: 150,
          width: 150,
          marginBottom: 30,
        }} source={require('../assets/routemaster.png')} />
      {/* <Text style={{fontWeight:'bold', fontSize:40, color: 'white', marginBottom: 40}}>Routemaster</Text> */}
      <View style = {styles.box}>
        {/* <Text style={{fontWeight:'bold',textAlign:'center', color: '#3D73DD', fontSize:20, marginBottom: 20}}>LOGIN</Text> */}
        
          <Text style={{color: '#3D73DD', fontSize:18, fontWeight: 'bold', marginBottom: -5}}>username</Text>
        
        <TextInput 
        style={styles.inputText}
        value={name}
        onChangeText={text=> setName(text)} />
        <Text style={{color: '#3D73DD', fontSize:18, fontWeight: 'bold', marginBottom: -5}}>password</Text>
        
        <TextInput
        secureTextEntry
        value={password}
        // textContentType="password" 
        style={styles.inputText}
        onChangeText={text=> setPassword(text)} />

        <Button
        buttonStyle={{backgroundColor: '#3D73DD', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginVertical: 15}}
        icon = {
          <Icon
          name="map-marker"
          size={20}
          color="white"
          />
        }
        iconRight
        title="Login   "
        onPress={()=>onPress()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D73DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: (Dimensions.get('window').width)-100,
    height: (Dimensions.get('window').width)-100,
  },
  box:{
    backgroundColor:'white',
    flex: 0,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  inputText:{
    textAlign:'center',
    borderWidth: 1,
    borderColor: '#3D73DD',
    borderRadius:10,
    color:'#3D73DD',
    width: 200,
    padding: 5,
    margin: 15,
    fontSize: 16
  }
});
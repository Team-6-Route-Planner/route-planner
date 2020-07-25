import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TextInput} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'


export default ({navigation}) => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null)

  return (
    <View style ={styles.container}>
      <GeneralStatusBarColor backgroundColor="#3D73DD"
      barStyle="light-content"/>
      <Text style={{fontWeight:'bold', fontSize:40, color: 'white', marginBottom: 40}}>Routemaster</Text>
      <View style = {styles.box}>
        <Text style={{fontWeight:'bold',textAlign:'center', color: '#3D73DD', fontSize:20, marginBottom: 20}}>LOGIN</Text>
        <View style={{justifyItems:'flex-start', width: 200}}>
          <Text style={{color: '#3D73DD', fontSize:16, marginBottom: -10}}>username</Text>
        </View>
        <TextInput maxLength={10} 
        style={styles.inputText}
        onChangeText={text=> setName(text)} />

        <View style={{justifyItems:'flex-start', width: 200}}>
          <Text style={{color: '#3D73DD', fontSize:16, marginBottom: -10}}>password</Text>
        </View>
        <TextInput maxLength={10}
        secureTextEntry
        // textContentType="password" 
        style={styles.inputText}
        onChangeText={text=> setPassword(text)} />

        <Button
        buttonStyle={{backgroundColor: '#3D73DD', paddingHorizontal: 20, borderRadius: 20, marginVertical: 15}}
        icon = {
          <Icon
          name="gamepad"
          size={20}
          color="white"
          />
        }
        title="   Login"
        onPress={()=>navigation.navigate('Dashboard')}
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
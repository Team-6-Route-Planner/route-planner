import React, {useState, useEffect} from 'react';
import Maps from './pages/Maps'
import AllTrips from './pages/AllTrips'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DetailTrip from './pages/DetailTrip'
import CurrentTimeline from './pages/CurrentTimeline'
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {ApolloProvider} from '@apollo/client'
import client from './config'


export default function App(){
  const Stack = createStackNavigator()
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Maps" component={Maps} />
            <Stack.Screen name="All Trips" component={AllTrips} />
            <Stack.Screen name="Detail Trip" component={DetailTrip} />
            <Stack.Screen name="Current Timeline (temporary)" component={CurrentTimeline} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
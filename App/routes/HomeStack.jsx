import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Camera from '../screens/Camera'
import Options from '../screens/Options'
import SavedText from '../screens/SavedText'
import GeneratedText from '../screens/GeneratedText'

const Stack = createStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Camera'  screenOptions={{headerShown: false}}>

      <Stack.Screen name='Camera' component={Camera} />

      <Stack.Screen name='Options' component={Options} />

      <Stack.Screen name='SavedText' component={SavedText} />

      <Stack.Screen name='GeneratedText' component={GeneratedText} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
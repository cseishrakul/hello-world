import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer}from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// screen
import {onBoarding} from './app/screen/index.js';

const Stack = createStackNavigator();
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="onBoarding" component={onBoarding} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <App />
}

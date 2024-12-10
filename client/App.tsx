import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/app/Splash';
import SelectLanguage from './src/app/SelectLanguage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="select-language" component={SelectLanguage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

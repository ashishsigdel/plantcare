import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/app/Splash';
import SelectLanguage from './src/app/SelectLanguage';
import Auth from './src/app/Auth';
import VerifyOtp from './src/app/VerifyOtp';
import Tabs from './src/app/Tabs';
import {TranslationProvider} from './src/context/TranslationProvider';
import Camera from './src/app/home-tab/Camera';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TranslationProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="splash">
          <Stack.Screen name="splash" component={Splash} />
          <Stack.Screen name="select-language" component={SelectLanguage} />
          <Stack.Screen name="auth" component={Auth} />
          <Stack.Screen name="verify-otp" component={VerifyOtp} />
          <Stack.Screen name="tabs" component={Tabs} />
          <Stack.Screen name="camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;

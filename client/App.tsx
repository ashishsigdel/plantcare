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
import CameraGuide from './src/app/CameraGuide';
import Analysis from './src/app/Analysis';
import History from './src/app/home-tab/History';
import Insights from './src/app/home-tab/Insights';
import ResultPage from './src/app/ResultPage';

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
          <Stack.Screen name="camera-guide" component={CameraGuide} />
          <Stack.Screen name="analysis" component={Analysis} />
          <Stack.Screen name="history" component={History} />
          <Stack.Screen name="insights" component={Insights} />
          <Stack.Screen name="result" component={ResultPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
};

export default App;

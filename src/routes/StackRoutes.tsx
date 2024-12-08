import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Splash from '../screens/splash/Splash';
import Profile from '../screens/profile/Profile';
import Auth from '../screens/auth/Auth';
import {RootStackParamList} from '../types/navigation';
import VerifyOtp from '../screens/verify-otp/VerifyOtp';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="verify-otp" component={VerifyOtp} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default StackRoutes;

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../screens/tabs/Tab';
import Splash from '../screens/splash/Splash';
import Profile from '../screens/profile/Profile';
import Auth from '../screens/auth/Auth';
import {RootStackParamList} from '../types/navigation';
import VerifyOtp from '../screens/verify-otp/VerifyOtp';
import Home from '../screens/tabs/tabcomponents/Home';
import Settings from '../screens/tabs/tabcomponents/Settings';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash">
      <Stack.Screen name="tab" component={Tab} />
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="verify-otp" component={VerifyOtp} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default StackRoutes;

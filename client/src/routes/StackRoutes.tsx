import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../app/tabs/Tab';
import Splash from '../app/splash/Splash';
import Profile from '../app/profile/Profile';
import Auth from '../app/auth/Auth';
import {RootStackParamList} from '../types/navigation';
import VerifyOtp from '../app/verify-otp/VerifyOtp';
import Home from '../app/tabs/tabcomponents/Home';
import Settings from '../app/tabs/tabcomponents/Settings';
import SelectLanguage from '../app/splash/SelectLanguage';

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
      <Stack.Screen name="select-language" component={SelectLanguage} />
    </Stack.Navigator>
  );
};

export default StackRoutes;

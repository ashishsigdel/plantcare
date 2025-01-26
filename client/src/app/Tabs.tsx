import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from './home-tab/HomePage';
import Insights from './home-tab/Insights';
import Camera from './home-tab/Camera';
import History from './home-tab/History';
import SettingsPage from './home-tab/SettingsPage';
import {myColors} from '../styles/colors';
import {asyncStorage} from '../services/asyncStorage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import RequireAuth from '../utils/RequireAuth';

const TabBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface TabIconProps {
  icon: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({icon, name, focused}) => (
  <View style={styles.container}>
    <Icon name={icon} size={24} color={focused ? myColors.primary : 'gray'} />
    <Text style={focused ? styles.textFocused : styles.textNormal}>{name}</Text>
  </View>
);

const TabNavigator: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const accessToken = await asyncStorage.getItem('accessToken');
        if (!accessToken) {
          navigation.navigate('auth');
        }
      };
      checkAuth();
    }, [navigation]),
  );

  return (
    <>
      <RequireAuth>
        <TabBar.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: myColors.white,
              height: 65,
            },
            tabBarButton: props => (
              <TouchableOpacity
                {...(props as TouchableOpacityProps)}
                activeOpacity={1}>
                {props.children}
              </TouchableOpacity>
            ),
          }}>
          <TabBar.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarIcon: ({focused}) => (
                <TabIcon icon="home" name="Home" focused={focused} />
              ),
            }}
          />
          <TabBar.Screen
            name="Insights"
            component={Insights}
            options={{
              tabBarIcon: ({focused}) => (
                <TabIcon icon="stats-chart" name="Insights" focused={focused} />
              ),
            }}
          />
          <TabBar.Screen
            name="Camera"
            options={{
              tabBarButton: () => (
                <TouchableOpacity
                  style={styles.customCameraButtonContainer}
                  onPress={() => navigation.navigate('camera')}
                  activeOpacity={0.8}>
                  <View style={styles.customCameraButtonInner}>
                    <Icon name="camera" size={30} color="white" />
                  </View>
                </TouchableOpacity>
              ),
            }}>
            {() => null}
          </TabBar.Screen>
          <TabBar.Screen
            name="History"
            component={History}
            options={{
              tabBarIcon: ({focused}) => (
                <TabIcon icon="document" name="History" focused={focused} />
              ),
            }}
          />
          <TabBar.Screen
            name="Settings"
            options={{
              tabBarIcon: ({focused}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('settings')}
                  activeOpacity={0.8}
                  style={{
                    position: 'absolute',
                  }}>
                  <TabIcon icon="cog" name="Settings" focused={focused} />
                </TouchableOpacity>
              ),
            }}>
            {() => null}
          </TabBar.Screen>
        </TabBar.Navigator>
        <StatusBar barStyle={'dark-content'} />
      </RequireAuth>
    </>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerTitle: 'Settings',
          headerStyle: {backgroundColor: myColors.primary},
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    paddingTop: 15,
    gap: 7,
  },
  textFocused: {
    fontWeight: '600',
    color: myColors.primary,
    fontSize: 12,
  },
  textNormal: {
    fontWeight: '400',
    color: myColors.gray,
    fontSize: 12,
  },
  customCameraButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: myColors.white,
    position: 'absolute',
    alignSelf: 'center',
  },
  customCameraButtonInner: {
    backgroundColor: myColors.primary,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

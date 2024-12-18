import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  TouchableOpacityProps,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home-tab/Home';
import Settings from './home-tab/Settings';
import {myColors} from '../styles/colors';
import Camera from './home-tab/Camera';
import {asyncStorage} from '../services/asyncStorage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Insights from './home-tab/Insights';
import History from './home-tab/History';

// Create Bottom Tab Navigator
const TabBar = createBottomTabNavigator();

// Interface for Tab Icon Props
interface TabBarProps {
  icon: string;
  name: string;
  focused: boolean;
}

// Tab Icon Component
const TabIcon: React.FC<TabBarProps> = ({icon, name, focused}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color={focused ? myColors.primary : 'gray'} />
      {name ? (
        <Text style={focused ? styles.textFocused : styles.textNormal}>
          {name}
        </Text>
      ) : null}
    </View>
  );
};

const CustomCameraButton: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.customCameraButtonContainer}
      onPress={() => navigation.navigate('camera')}
      activeOpacity={0.8}>
      <View style={styles.customCameraButtonInner}>
        <Icon name="camera" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const Tab: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'auth'>>();
  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const accessToken = await asyncStorage.getItem('accessToken');
        if (!accessToken) {
          navigation.navigate('auth');
        }
      };
      checkAuth();
    }, []),
  );
  return (
    <>
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
          component={Home}
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
            tabBarButton: () => <CustomCameraButton />,
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
          component={Settings}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon icon="cog" name="Settings" focused={focused} />
            ),
          }}
        />
      </TabBar.Navigator>
      <StatusBar barStyle={'dark-content'} />
    </>
  );
};

export default Tab;

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

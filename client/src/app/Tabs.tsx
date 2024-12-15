import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  TouchableOpacityProps,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home-tab/Home';
import Settings from './home-tab/Settings';
import {myColors} from '../styles/colors';

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

// Custom Camera Button for Camera Tab
const CustomCameraButton: React.FC<{
  onPress?: (event: GestureResponderEvent) => void;
}> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.customCameraButtonContainer}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.customCameraButtonInner}>
        <Icon name="camera" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

// Main Tab Navigator Component
const Tab: React.FC = () => {
  return (
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
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon icon="stats-chart" name="Insights" focused={focused} />
          ),
        }}
      />

      <TabBar.Screen
        name="Camera"
        component={Home} // Replace with your Camera screen
        options={{
          tabBarButton: props => <CustomCameraButton onPress={props.onPress} />,
        }}
      />

      <TabBar.Screen
        name="History"
        component={Home}
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

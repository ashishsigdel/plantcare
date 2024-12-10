import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home-tab/Home';
import Settings from './home-tab/Settings';

const TabBar = createBottomTabNavigator();

const Tab = () => {
  return (
    <TabBar.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TabBar.Screen name="Home" component={Home} />
      <TabBar.Screen name="Settings" component={Settings} />
    </TabBar.Navigator>
  );
};

export default Tab;

const styles = StyleSheet.create({});

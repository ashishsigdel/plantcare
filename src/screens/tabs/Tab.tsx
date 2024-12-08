import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './tabcomponents/Home';
import Settings from './tabcomponents/Settings';

const TabBar = createBottomTabNavigator();

const Tab = () => {
  return (
    <TabBar.Navigator>
      <TabBar.Screen name="Home" component={Home} />
      <TabBar.Screen name="Settings" component={Settings} />
    </TabBar.Navigator>
  );
};

export default Tab;

const styles = StyleSheet.create({});

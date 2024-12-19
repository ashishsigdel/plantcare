import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {About, Account, General, Legal, SettingsTop, Support} from '.';
import {ScrollView} from 'react-native';

const Settings = () => {
  return (
    <>
      <SettingsTop />
      <ScrollView>
        <Account />
        <General />
        <Support />
        <About />
        <Legal />
      </ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({});

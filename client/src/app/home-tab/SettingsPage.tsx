import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Settings} from '../../components/settings';

const SettingsPage = () => {
  return (
    <SafeAreaView>
      <Settings />
    </SafeAreaView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({});

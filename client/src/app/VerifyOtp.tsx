import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {myColors} from '../styles/colors';
import {Verify} from '../components/verify-otp';

const VerifyOtp = () => {
  return (
    <View style={styles.container}>
      <Verify />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
  },
});

export default VerifyOtp;

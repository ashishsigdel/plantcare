import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {myColors} from '../styles/colors';
import {AuthComponent} from '../components/auth';

const Auth = () => {
  return (
    <View style={styles.container}>
      <AuthComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
  },
});

export default Auth;

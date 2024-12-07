import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {AuthComponent} from '../../components/auth';
import {Styles} from '../../../assets/colors/colors';

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
    backgroundColor: Styles.lightwhite,
  },
});

export default Auth;

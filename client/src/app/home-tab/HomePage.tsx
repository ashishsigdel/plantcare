import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Home} from '../../components/home';
import {myColors} from '../../styles/colors';

const HomePage = () => {
  return (
    <View
      style={{
        backgroundColor: myColors.white,
      }}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: myColors.lightwhite,
          }}>
          <Home />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: myColors.lightwhite,
    paddingBottom: 120,
  },
});

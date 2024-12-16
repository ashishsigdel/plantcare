import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeContent, HomeTop} from '../../components/home';

const Home = () => {
  return (
    <View>
      <HomeTop />
      <HomeContent />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

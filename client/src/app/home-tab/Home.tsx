import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {HomeContent, HomeTop} from '../../components/home';
import {myColors} from '../../styles/colors';

const Home = () => {
  return (
    <View
      style={{
        backgroundColor: myColors.white,
      }}>
      <SafeAreaView
        style={{
          backgroundColor: myColors.white,
        }}>
        <HomeTop />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <HomeContent />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: myColors.lightwhite,
    paddingBottom: 120,
  },
});

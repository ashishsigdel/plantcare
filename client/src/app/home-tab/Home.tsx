import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {HomeContent, HomeTop} from '../../components/home';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HomeTop />
        <HomeContent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
});

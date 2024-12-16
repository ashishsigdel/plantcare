import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SearchForm} from '../../utils';
import Explore from './Explore';

const HomeContent = () => {
  const [search, setSearch] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SearchForm placeholder="Search..." inputMode="text" />
      <Explore />
    </ScrollView>
  );
};

export default HomeContent;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

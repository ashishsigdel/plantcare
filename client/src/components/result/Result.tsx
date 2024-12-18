import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import diseasesPlant from '../../assets/cauliflower/cauliflower.jpeg';
import {myColors} from '../../styles/colors';
import {BottomBar} from '.';

const Result = () => {
  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16}>
        {/* Top Parallax Image */}
        <View style={[styles.imageContainer]}>
          <Image source={diseasesPlant} style={styles.image} />
        </View>

        {/* Below Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Cabbage - Brassica Oleracea</Text>
          <Text style={styles.description}>
            Cabbage, a species of kale, is also known as wild mustard, Brussels
            sprouts, broccoli, and cauliflower. It belongs to the Brassica genus
            and is widely cultivated for its edible leaves.
          </Text>
          <Text style={styles.subheading}>Popular Cultivars:</Text>
          <Text style={styles.listItem}>&#8226; 'Noelle'</Text>
          <Text style={styles.listItem}>&#8226; 'January King'</Text>
          <Text style={styles.listItem}>&#8226; 'Green Magic'</Text>
          <Text style={styles.listItem}>&#8226; 'Redbor'</Text>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
    position: 'relative',
  },
  imageContainer: {
    height: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

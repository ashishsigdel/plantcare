import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DefaultImage from '../../assets/defaultProfile.jpg';
import {myColors} from '../../styles/colors';
import {ToggleLanguage} from '../../utils';

const HomeTop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 20,
            color: myColors.primary,
            fontWeight: 500,
          }}>
          Plant
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: myColors.gray,
            fontWeight: 500,
          }}>
          Care
        </Text>
      </View>
      <ToggleLanguage />
    </View>
  );
};

export default HomeTop;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: myColors.white,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

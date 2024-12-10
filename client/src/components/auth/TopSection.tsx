import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import {myColors} from '../../styles/colors';
import {useTranslation} from 'react-i18next';

const TopSection = () => {
  const {t} = useTranslation('auth');
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{t('title')}</Text>
      </View>
    </View>
  );
};

export default TopSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {},
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: myColors.black,
    textAlign: 'center',
  },
});

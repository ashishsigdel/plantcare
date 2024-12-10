import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import logo from '../assets/logo.png';
import {myColors} from '../styles/colors';
import {RootStackParamList} from '../types/navigation';
import {Spinner} from '../utils';
import {asyncStorage} from '../services/asyncStorage';
const Splash = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'select-language'>
    >();
  useFocusEffect(
    useCallback(() => {
      const checkUser = async () => {
        const language: string = await asyncStorage.getItem('USER_LANGUAGE');
        if (!language) {
          navigation.navigate('select-language');
          return;
        }
        const accessToken: string = await asyncStorage.getItem('accessToken');
        if (accessToken) {
          navigation.navigate('tabs');
          return;
        } else {
          navigation.navigate('auth');
          return;
        }
      };
      checkUser();
    }, []),
  );
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={logo}
            alt="Person"
            width={24}
            height={24}
            style={styles.logo}
          />
          <View style={styles.loadingContainer}>
            <Spinner />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.white,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
export default Splash;

import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {myColors} from '../styles/colors';
import {AuthComponent} from '../components/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {asyncStorage} from '../services/asyncStorage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

const Auth = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'tabs'>>();
  useFocusEffect(
    useCallback(() => {
      const check = async () => {
        const accessToken = await asyncStorage.getItem('accessToken');
        if (accessToken) {
          navigation.navigate('tabs');
          return;
        }
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      <AuthComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
  },
});

export default Auth;

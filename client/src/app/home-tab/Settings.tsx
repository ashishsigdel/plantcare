import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const Settings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'auth'>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('auth');
  };
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});

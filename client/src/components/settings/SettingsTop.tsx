import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useTranslation} from 'react-i18next';

const SettingsTop = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation('settings');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={20} color={myColors['gray-hard']} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          color: myColors.gray,
          fontWeight: 600,
          letterSpacing: 2,
        }}>
        {t('title')}
      </Text>
    </View>
  );
};

export default SettingsTop;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: myColors.white,
    position: 'relative',
  },
});

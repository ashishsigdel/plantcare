import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useTranslation} from 'react-i18next';

const Account = () => {
  const {t} = useTranslation('settings');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'auth'>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('auth');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('account')}</Text>
      <View style={styles.listContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('profile')}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon name="person-outline" size={20} color={myColors['gray-hard']} />
          <Text style={styles.listItemText}>{t('profile')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon
            name="log-out-outline"
            size={20}
            color={myColors['gray-hard']}
          />
          <Text style={styles.listItemText}>{t('logout')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 20,
    color: myColors.gray,
  },
  listContainer: {
    marginTop: 10,
    backgroundColor: myColors.white,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: myColors.lightwhite,
    position: 'relative',
  },
  listItemText: {
    fontSize: 16,
    color: myColors['gray-hard'],
    fontWeight: '500',
  },
  chevronIcon: {
    position: 'absolute',
    right: 20,
  },
});

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {About, Account, General, Legal, SettingsTop, Support} from '.';
import {ScrollView} from 'react-native';
import TopBar from '../../utils/TopBar';
import {useTranslation} from 'react-i18next';

const Settings = () => {
  const {t} = useTranslation('settings');
  return (
    <>
      <TopBar title={t('title')} />
      <ScrollView>
        <Account />
        <General />
        <Support />
        <About />
        <Legal />
      </ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({});

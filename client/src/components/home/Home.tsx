import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {ScrollView} from 'react-native';
import {HomeHelp, HomeTop} from '.';
import {SearchForm} from '../../utils';
import Explore from './Explore';
import RecentScan from './RecentScan';
import {useTranslation} from 'react-i18next';

const Settings = () => {
  const {t} = useTranslation('home');
  return (
    <>
      <HomeTop />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <SearchForm placeholder={t('search')} inputMode="text" />
          <Explore />
          <RecentScan />
          <HomeHelp />
        </View>
      </ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({});

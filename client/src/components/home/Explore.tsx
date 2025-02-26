import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {myColors} from '../../styles/colors';
import scanPlant from '../../assets/icons/iris-scan.png';
import history from '../../assets/icons/history.png';
import user from '../../assets/icons/user.png';
import Icon from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

const ExploreBox = ({
  icon = scanPlant,
  title1 = 'Scan',
  title2 = 'Plant',
  color = myColors.primary,
  onpress = () => {},
}) => {
  return (
    <TouchableOpacity onPressOut={onpress} style={styles.exploreBox}>
      <Icon
        name="arrow-up-right"
        size={16}
        color={'gray'}
        style={styles.icon}
      />
      <Image source={icon} style={[styles.boxImage, {tintColor: color}]} />
      <View>
        <Text style={[styles.boxTitle, {color: color}]}>{title1}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>{title2}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const {t} = useTranslation('home');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.exploreSection}>
      <Text style={styles.exploreTitle}>Explore Plantcare</Text>
      <View style={styles.exploreGrid}>
        <ExploreBox
          title1={t('quick-scan')}
          title2={t('quick-scan-description')}
          onpress={() => navigation.navigate('camera')}
        />
      </View>
      <View style={styles.exploreGrid}>
        <ExploreBox
          title1={t('plant')}
          title2={t('history')}
          color="#0075A2"
          icon={history}
        />
        <ExploreBox
          title1={t('browse')}
          title2={t('disease')}
          color="#5CA4A9"
          icon={user}
          onpress={() => navigation.navigate('profile')}
        />
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  exploreSection: {
    marginTop: 20,
  },
  exploreTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  exploreGrid: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  exploreBox: {
    flex: 1,
    padding: 20,
    backgroundColor: myColors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  boxImage: {
    width: 38,
    height: 38,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  boxTitle2: {
    fontSize: 14,
    fontWeight: '500',
  },
});

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Cauliflower from '../../assets/icons/cauliflower.png';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import Filter from './Filter';

const RecentScanCard = ({
  icon = Cauliflower,
  title1 = 'Scan',
  title2 = 'Plant',
  date = '',
  color = myColors.black,
}) => {
  return (
    <View style={styles.recentRecentScan}>
      <Image source={icon} style={[styles.boxImage]} />
      <View>
        <Text style={[styles.boxTitle, {color: color}]}>{title1}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>{title2}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>
          Date: {date}
        </Text>
      </View>
      <Icon name="info" size={16} color={'gray'} style={styles.icon} />
    </View>
  );
};

const HistoryTab = () => {
  return (
    <>
      <Filter />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.recentScanGrid}>
          <RecentScanCard
            title1="Cauliflower"
            title2="Soft Rot Disease - Medium Risk"
            date="Jan 20, 2025"
            icon={Cauliflower}
          />
          <RecentScanCard
            title1="Orange"
            title2="Citrus Black Spot - High Risk"
            date="Jan 20, 2025"
            icon={Cauliflower}
          />
          <RecentScanCard
            title1="Cauliflower"
            title2="Healthy"
            date="Jan 20, 2025"
            icon={Cauliflower}
          />
          <RecentScanCard
            title1="Cauliflower"
            title2="Soft Rot Disease - Medium Risk"
            date="Jan 20, 2025"
            icon={Cauliflower}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HistoryTab;

const styles = StyleSheet.create({
  recentScanGrid: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 16,
  },
  recentRecentScan: {
    width: '100%',
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
    right: 15,
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
  scrollview: {
    paddingBottom: 220,
  },
});

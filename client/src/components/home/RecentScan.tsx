import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import Cauliflower from '../../assets/icons/cauliflower.png';
import Orange from '../../assets/icons/orange.png';

const RecentScanCard = ({
  icon = Cauliflower,
  title1 = 'Scan',
  title2 = 'Plant',
  color = myColors.primary,
}) => {
  return (
    <View style={styles.recentRecentScan}>
      <Icon
        name="arrow-up-right"
        size={16}
        color={'gray'}
        style={styles.icon}
      />
      <Image source={icon} style={[styles.boxImage]} />
      <View>
        <Text style={[styles.boxTitle, {color: color}]}>{title1}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>{title2}</Text>
      </View>
    </View>
  );
};

const RecentScan = () => {
  return (
    <View style={styles.recentScanSection}>
      <Text style={styles.recentScanTitle}>Recent Scans </Text>
      <View style={styles.recentScanGrid}>
        <RecentScanCard
          title1="Cauliflower"
          title2="Soft Rot Disease - Medium Risk"
          icon={Cauliflower}
        />
        <RecentScanCard
          title1="Orange"
          title2="Citrus Black Spot - High Risk"
          icon={Orange}
        />
        <RecentScanCard
          title1="Cauliflower"
          title2="Healthy"
          icon={Cauliflower}
        />
      </View>
    </View>
  );
};

export default RecentScan;

const styles = StyleSheet.create({
  recentScanSection: {
    marginTop: 20,
  },
  recentScanTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  recentScanGrid: {
    marginTop: 10,
    gap: 10,
  },
  recentRecentScan: {
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

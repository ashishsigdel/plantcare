import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import Cauliflower from '../../assets/icons/cauliflower.png';
import Orange from '../../assets/icons/orange.png';
import {useTranslation} from 'react-i18next';
import useHistory from '../history/useHistory';
import RecentScanCard from '../history/RecentScanCard';

const RecentScan = () => {
  const {t} = useTranslation('home');
  const {fetchHistory, history, loading, totalPages, currentPage} =
    useHistory();

  useEffect(() => {
    fetchHistory(1, 3);
  }, []);
  return (
    <View style={styles.recentScanSection}>
      <Text style={styles.recentScanTitle}>{t('recent-scan')}</Text>
      <View style={styles.recentScanGrid}>
        {}
        {history.length > 0 &&
          history.map((h: any) => (
            <RecentScanCard
              key={h.id}
              id={h.upload.id}
              title1="Cauliflower"
              title2={h.disease.name}
              date={new Date(h.createdAt).toLocaleDateString()}
              icon={h.hPatternUrl}
              uploadId={h.upload.id}
            />
          ))}
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

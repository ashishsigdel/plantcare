import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Cauliflower from '../../assets/icons/cauliflower.png';
import Icon from 'react-native-vector-icons/Feather';
import {myColors} from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const RecentScanCard = ({
  icon,
  id,
  title1,
  title2,
  date,
  color = myColors.black,
  uploadId,
}: {
  icon: any;
  id: number;
  title1: string;
  title2: string;
  date: string;
  color?: any;
  uploadId: number;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('HistoryResult', {id: id})}
      style={styles.recentRecentScan}>
      <Image source={Cauliflower} style={[styles.boxImage]} />
      <View>
        <Text style={[styles.boxTitle, {color: color}]}>{title1}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>{title2}</Text>
        <Text style={[styles.boxTitle2, {color: myColors.gray}]}>
          Date: {date}
        </Text>
      </View>
      <Icon name="info" size={16} color={'gray'} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default RecentScanCard;

const styles = StyleSheet.create({
  recentRecentScan: {
    width: '100%',
    padding: 20,
    backgroundColor: myColors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    position: 'relative',
    marginBottom: 10,
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
});

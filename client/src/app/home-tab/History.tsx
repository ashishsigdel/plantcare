import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from '../../utils/TopBar';
import RecentScan from '../../components/home/RecentScan';
import HistoryTab from '../../components/history/HistoryTab';
import {myColors} from '../../styles/colors';

const History = () => {
  return (
    <View
      style={{
        backgroundColor: myColors.white,
      }}>
      <SafeAreaView>
        <TopBar title="History" back={false} />
        <View
          style={{
            paddingVertical: 8,
            backgroundColor: myColors.lightwhite,
          }}>
          <HistoryTab />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});

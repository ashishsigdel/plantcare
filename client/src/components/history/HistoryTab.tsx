import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {myColors} from '../../styles/colors';
import Filter from './Filter';
import useHistory from './useHistory';
import RecentScanCard from './RecentScanCard';

const HistoryTab = () => {
  const {fetchHistory, history, loading, handleFilterChange, filter} =
    useHistory();

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color={myColors.primary} />
      </View>
    );
  };

  return (
    <>
      <Filter selectedFilter={filter} onFilterChange={handleFilterChange} />
      <FlatList
        data={history}
        renderItem={({item: report}: any) => (
          <RecentScanCard
            key={report.id}
            title1="Cauliflower"
            title2={report.disease.name}
            date={new Date(report.createdAt).toLocaleDateString()}
            icon={report.reportPatternUrl}
            uploadId={report.upload.id}
          />
        )}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.flatList}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

export default HistoryTab;

const styles = StyleSheet.create({
  flatList: {
    padding: 16,
    paddingBottom: 310,
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

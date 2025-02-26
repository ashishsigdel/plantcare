import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {myColors} from '../../styles/colors';
import useHistory from './useHistory';
import RecentScanCard from './RecentScanCard';

const HistoryTab = () => {
  const {fetchHistory, history, loading, totalPages, currentPage} =
    useHistory();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    fetchHistory(1, 10);
  }, []);

  const loadMore = () => {
    if (loading || isFetchingMore || currentPage >= totalPages) return;

    setIsFetchingMore(true);
    fetchHistory(currentPage + 1).finally(() => setIsFetchingMore(false));
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color={myColors.primary} />
      </View>
    );
  };

  if (history.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
          }}>
          No Histroy Found.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={history}
      renderItem={({item: report}: any) => (
        <RecentScanCard
          key={report.id}
          id={report.upload.id}
          title1="Cauliflower"
          title2={report.disease.name}
          date={new Date(report.createdAt).toLocaleDateString()}
          icon={report.reportPatternUrl}
          uploadId={report.upload.id}
        />
      )}
      keyExtractor={(item: any) => item.id.toString()}
      contentContainerStyle={styles.flatList}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HistoryTab;

const styles = StyleSheet.create({
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
    minHeight: '100%',
  },
  flatList: {
    padding: 16,
    paddingBottom: 150,
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

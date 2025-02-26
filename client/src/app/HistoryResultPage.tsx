import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {myAxios} from '../services/apiServices';
import {Result} from '../components/scanning/result';

type HistoryResultRouteProps = RouteProp<RootStackParamList, 'HistoryResult'>;

const HistoryResultPage = () => {
  const route = useRoute<HistoryResultRouteProps>();
  const [result, setResult] = useState(null);

  // Extract the id from route.params
  const {id} = route.params;

  useEffect(() => {
    const getResult = async () => {
      const response = await myAxios(`/user/history/${id}`);

      setResult(response.data.data.responseData);
    };
    getResult();
  }, [id]);

  return <>{result && <Result result={result} />}</>;
};

export default HistoryResultPage;

const styles = StyleSheet.create({});

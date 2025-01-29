import {useEffect, useState} from 'react';
import {myAxios} from '../../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {asyncStorage} from '../../services/asyncStorage';

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'7' | '14' | '30' | ''>('');

  const saveHistoryToStorage = async (data: any) => {
    try {
      await asyncStorage.setItem('history_data', {
        history: data,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.log('Error saving to storage:', error);
    }
  };

  const loadHistoryFromStorage = async () => {
    try {
      const stored = await asyncStorage.getItem('history_data');
      if (stored) {
        const {history: storedHistory} = stored;
        setHistory(storedHistory);
      }
    } catch (error) {
      console.log('Error loading from storage:', error);
    }
  };

  const fetchHistory = async (till = '') => {
    if (loading) return;
    setLoading(true);

    try {
      const isConnected = await NetInfo.fetch();

      if (isConnected.isConnected) {
        const response = await myAxios.get(`/user/history?till=${till}`);

        setHistory(response.data.data.history);
        saveHistoryToStorage(response.data.data.history);
      } else {
        await loadHistoryFromStorage();
      }
    } catch (error) {
      console.log(error);
      await loadHistoryFromStorage();
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: '7' | '14' | '30' | '') => {
    setFilter(newFilter);
    fetchHistory(newFilter);
  };

  return {
    history,
    fetchHistory,
    loading,
    handleFilterChange,
    filter,
  };
}

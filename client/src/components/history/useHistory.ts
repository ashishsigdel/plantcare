import {useEffect, useState} from 'react';
import {myAxios} from '../../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {asyncStorage} from '../../services/asyncStorage';

export default function useHistory() {
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchHistory = async (page: number, limit = 10) => {
    if (loading) return;
    setLoading(true);

    try {
      const isConnected = await NetInfo.fetch();

      if (isConnected.isConnected) {
        const response = await myAxios.get(
          `/user/history?page=${page}&limit=${limit}`,
        );

        if (page === 1) {
          setHistory(response.data.data.history);
        } else {
          setHistory((prev: any) => [...prev, ...response.data.data.history]);
        }
        // saveHistoryToStorage(response.data.data.history);
        setTotalPages(response.data.data.totalPages);
        setCurrentPage(response.data.data.currentPage);
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

  return {
    history,
    fetchHistory,
    loading,
    totalPages,
    currentPage,
  };
}

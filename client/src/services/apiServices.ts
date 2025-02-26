import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';
import {NavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

export const baseUrl = `http://192.168.1.102:8000/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export let navigationRef: NavigationContainerRef<RootStackParamList> | null =
  null;

export const setNavigationRef = (
  navRef: NavigationContainerRef<RootStackParamList>,
) => {
  navigationRef = navRef;
};

myAxios.interceptors.response.use(
  response => response,
  async error => {
    // URLs to be ignored for token refresh
    const byPassUrls = ['/auth/register', '/auth/verify-otp', '/auth/login'];

    if (error.config && byPassUrls.includes(error.config.url)) {
      throw error;
    }

    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('accessToken');

      if (navigationRef) {
        navigationRef.navigate('auth');
      }
    }
    throw error;
  },
);

myAxios.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export {myAxios};

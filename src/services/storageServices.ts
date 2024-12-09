import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageServices = {
  setItem: async (key: string, value: any, handleErrorCallback?: Function) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Asyncstorage Error: ', error);
      handleErrorCallback?.(error);
    }
  },
  getItem: async (key: string, handleErrorCallback?: Function) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('Asyncstorage Error: ', error);
      handleErrorCallback?.(error);
    }
  },
};

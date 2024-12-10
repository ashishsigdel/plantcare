import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorage = {
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
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('Asyncstorage Error: ', error);
      handleErrorCallback?.(error);
    }
  },
};

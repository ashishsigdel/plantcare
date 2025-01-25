import React, {useState} from 'react';
import {Alert} from 'react-native';
import {myAxios} from '../../services/apiServices';
import {asyncStorage} from '../../services/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

export default function useRegister() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'verify-otp'>
    >();
  const [fullname, setFullname] = useState('');
  const [data, setData] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [dataError, setDataError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateFullName = () => {
    if (!fullname) {
      setFullNameError('Fullname is required!');
      return;
    } else {
      setFullNameError('');
    }
  };
  const validateData = () => {
    if (!data) {
      setDataError('Phone or email is required!');
      return;
    } else {
      setDataError('');
    }
  };

  const handlePress = async () => {
    validateData();
    validateFullName();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
    let email, phone;
    isEmail ? (email = data) : (phone = data);
    if (!isEmail && data.length !== 10) {
      Alert.alert('Error', "Phone Number's length should be 10.");
      return;
    }
    setLoading(true);
    if (fullname && (email || phone) && !fullNameError && !dataError) {
      try {
        const response = await myAxios.post('/auth/register', {
          fullName: fullname,
          email,
          phone,
        });
        await asyncStorage.setItem('guest', JSON.stringify({email, phone}));
        navigation.navigate('verify-otp');
        setFullname('');
        setData('');
      } catch (error: any) {
        Alert.alert(error?.response?.data?.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleLogin = async () => {
    validateData();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
    let email, phone;
    isEmail ? (email = data) : (phone = data);
    if (!isEmail && data.length !== 10) {
      // Alert.alert('Error', "Phone Number's length should be 10.");
      // return;
    }
    setLoading(true);
    if ((email || phone) && !dataError) {
      try {
        const response = await myAxios.post('/auth/login', {
          email,
          phone,
        });
        await asyncStorage.setItem('guest', JSON.stringify({email, phone}));
        navigation.navigate('verify-otp');
        setData('');
      } catch (error: any) {
        console.log(error);

        Alert.alert(
          'Error',
          error?.response?.data?.message || 'Something went wrong!',
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    fullname,
    setFullname,
    data,
    setData,
    handlePress,
    fullNameError,
    dataError,
    loading,
    handleLogin,
  };
}

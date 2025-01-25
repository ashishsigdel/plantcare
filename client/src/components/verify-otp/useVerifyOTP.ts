import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {asyncStorage} from '../../services/asyncStorage';
import {Alert, TextInput} from 'react-native';
import {myAxios} from '../../services/apiServices';
import {useLocale} from '../../context/TranslationProvider';

export default function useVerifyOTP() {
  const {changeLanguage} = useLocale();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'home'>>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);
  const [otpError, setOtpError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    const {email, phone} = JSON.parse(await asyncStorage.getItem('guest'));

    if (!email && !phone) {
      Alert.alert('Error', 'Please loging again.');
      navigation.navigate('auth');
    }
    try {
      const response = await myAxios.post('/auth/login', {
        email,
        phone,
      });
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong!',
      );
    }
  };

  const handleVerify = async () => {
    if (otp.join('').length !== 6) {
      setOtpError('6 digits otp required!');
    } else {
      setOtpError('');
    }
    const {email, phone} = JSON.parse(await asyncStorage.getItem('guest'));

    if (!email && !phone) {
      Alert.alert('Error', 'Please loging again.');
      navigation.navigate('auth');
    }
    if (otp && !otpError) {
      setLoading(true);
      try {
        const response = await myAxios.post('/auth/verify-otp', {
          otp: otp.join(''),
          email,
          phone,
        });
        const accessToken = response.data.data.accessToken;
        const user = response.data.data.user;

        await asyncStorage.setItem('accessToken', accessToken);
        await asyncStorage.setItem('user', user);
        await asyncStorage.removeItem('guest');
        await asyncStorage.setItem('USER_LANGUAGE', user.language);
        changeLanguage(user.language);
        navigation.navigate('tabs');
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
    otp,
    inputs,
    otpError,
    handleOtpChange,
    handleKeyPress,
    timer,
    handleResend,
    handleVerify,
    loading,
  };
}

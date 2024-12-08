import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Styles} from '../../../assets/colors/colors';
import CustomButton from '../utils/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const VerifyOtp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'home'>>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

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

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus(); // Focus on the first input
    console.log('Resend OTP');
  };

  const handleVerify = () => {
    console.log('OTP Entered:', otp.join(''));
    if (otp.join('').length === 6) {
      navigation.navigate('home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your mobile number
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref!)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Does not received?</Text>
          {timer > 0 && (
            <Text style={styles.timerText}>Resend in {timer}s</Text>
          )}
          <TouchableOpacity
            onPress={handleResend}
            disabled={timer > 0}
            style={timer > 0 ? styles.resendDisabled : styles.resendActive}>
            {timer === 0 && <Text style={styles.timerTextZeor}>Resend</Text>}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Verify"
          handlePress={handleVerify}
          containerStyles={styles.verifyButton}
          textStyles={styles.verifyButtonText}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.lightwhite,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Styles.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Styles.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: Styles.gray,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    color: Styles.primary,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  resendActive: {
    borderColor: Styles.primary,
  },
  resendDisabled: {
    borderBottomWidth: 1,
    borderColor: Styles.gray,
  },
  resendText: {
    fontSize: 16,
    color: Styles.primary,
    marginRight: 8,
  },
  timerText: {
    fontSize: 16,
    color: Styles.gray,
  },
  timerTextZeor: {
    fontSize: 16,
    color: Styles.primary,
  },
  verifyButton: {
    backgroundColor: Styles.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Styles.white,
  },
});

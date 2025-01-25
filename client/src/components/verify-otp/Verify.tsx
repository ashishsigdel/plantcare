import React from 'react';
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
import {CustomButton} from '../../utils';
import {myColors} from '../../styles/colors';
import {useTranslation} from 'react-i18next';
import useVerifyOTP from './useVerifyOTP';

const Verify = () => {
  const {t} = useTranslation('verify-otp');
  const {
    otp,
    inputs,
    otpError,
    handleOtpChange,
    handleKeyPress,
    timer,
    handleResend,
    handleVerify,
    loading,
  } = useVerifyOTP();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('description')}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref!)}
              style={otpError ? styles.otpInputError : styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>
        {otpError && <Text style={styles.errorText}>{t('invalid-otp')}</Text>}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>{t('not-received')}</Text>
          {timer > 0 && (
            <Text style={styles.timerText}>
              {t('resend-in')} {timer}s
            </Text>
          )}
          <TouchableOpacity
            onPress={handleResend}
            disabled={timer > 0}
            style={timer > 0 ? styles.resendDisabled : styles.resendActive}>
            {timer === 0 && (
              <Text style={styles.timerTextZeor}>{t('resend')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title={t('verify')}
          handlePress={handleVerify}
          containerStyles={styles.verifyButton}
          textStyles={styles.verifyButtonText}
          isLoading={loading}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: myColors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: myColors.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 5,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: myColors.gray,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    color: myColors.primary,
  },
  otpInputError: {
    borderWidth: 1,
    borderColor: myColors.red,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    color: myColors.primary,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  resendActive: {
    borderColor: myColors.primary,
  },
  resendDisabled: {
    borderBottomWidth: 1,
    borderColor: myColors.gray,
  },
  resendText: {
    fontSize: 16,
    color: myColors.primary,
    marginRight: 8,
  },
  timerText: {
    fontSize: 16,
    color: myColors.gray,
  },
  timerTextZeor: {
    fontSize: 16,
    color: myColors.primary,
  },
  verifyButton: {
    backgroundColor: myColors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: myColors.white,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

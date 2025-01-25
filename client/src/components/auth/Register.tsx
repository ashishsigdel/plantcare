import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton, FormField} from '../../utils';
import {myColors} from '../../styles/colors';
import {useTranslation} from 'react-i18next';
import useRegister from './useRegister';

interface RegisterProps {
  openLogin: () => void;
}

const Register = ({openLogin}: RegisterProps) => {
  const {t} = useTranslation('auth');

  const {
    fullname,
    setFullname,
    data,
    setData,
    handlePress,
    fullNameError,
    dataError,
    loading,
  } = useRegister();
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{t('register')}</Text>

      <View style={styles.formContainer}>
        <View>
          <FormField
            title={t('fullname')}
            placeholder={t('name-placeholder')}
            inputMode="text"
            value={fullname}
            handleChange={e => setFullname(e)}
            error={fullNameError}
          />
        </View>
        <FormField
          title={t('mobile')}
          placeholder={t('mobile-placeholder')}
          inputMode="text"
          value={data}
          handleChange={e => setData(e)}
          error={dataError}
        />

        <TouchableOpacity
          onPress={openLogin}
          style={{alignSelf: 'flex-end'}}
          activeOpacity={0.7}>
          <Text style={styles.notRegister}>{t('already-register')}</Text>
        </TouchableOpacity>

        <CustomButton
          title={t('send')}
          handlePress={handlePress}
          containerStyles={styles.buttonContainer}
          textStyles={styles.buttonText}
          isLoading={loading}
          iconname={'send-outline'}
        />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loginText: {
    textAlign: 'center',
    color: myColors.primary,
    fontSize: 24,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 30,
    rowGap: 10,
  },
  notRegister: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: myColors.primary,
  },

  buttonContainer: {
    marginTop: 26,
    backgroundColor: myColors.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: myColors.white,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: myColors.gray,
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    backgroundColor: myColors.white,
  },
  helpTextContainer: {
    marginLeft: 10,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: myColors.primary,
  },
  helpSubtitle: {
    fontSize: 14,
    color: myColors.gray,
  },
  errorText: {
    fontSize: 12,
    marginTop: 1,
    color: myColors.red,
  },
});

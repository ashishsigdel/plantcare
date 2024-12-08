import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from '../../../assets/colors/colors';
import FormField from '../utils/FormField';
import CustomButton from '../utils/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

interface LoginProps {
  openRegister: () => void;
}

const Login = ({openRegister}: LoginProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'verify-otp'>
    >();
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login with Phone</Text>

      <View style={styles.formContainer}>
        <FormField
          title="Enter your mobile"
          placeholder="+977 **********"
          inputMode="numeric"
        />

        <TouchableOpacity
          onPress={openRegister}
          style={{alignSelf: 'flex-end'}}
          activeOpacity={0.7}>
          <Text style={styles.notRegister}>Not Registered?</Text>
        </TouchableOpacity>

        <CustomButton
          title="Send OTP"
          handlePress={() => navigation.navigate('verify-otp')}
          containerStyles={styles.buttonContainer}
          textStyles={styles.buttonText}
          isLoading={false}
          iconname="send-outline"
        />
      </View>

      <View style={styles.helpContainer}>
        <Icon name="help-circle-outline" size={24} color={Styles.primary} />
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpTitle}>Help Center</Text>
          <Text style={styles.helpSubtitle}>
            Get solutions for your queries.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loginText: {
    textAlign: 'center',
    color: Styles.primary,
    fontSize: 24,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 30,
  },
  notRegister: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: Styles.primary,
  },

  buttonContainer: {
    marginTop: 32,
    backgroundColor: Styles.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Styles.white,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Styles.gray,
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Styles.white,
  },
  helpTextContainer: {
    marginLeft: 10,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Styles.primary,
  },
  helpSubtitle: {
    fontSize: 14,
    color: Styles.gray,
  },
});

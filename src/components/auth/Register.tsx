import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from '../../../assets/colors/colors';
import FormField from '../utils/FormField';
import CustomButton from '../utils/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

interface RegisterProps {
  openLogin: () => void;
}

const Register = ({openLogin}: RegisterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Register with Phone</Text>

      <View style={styles.formContainer}>
        <FormField
          title="Enter your fullname"
          placeholder="Your name"
          inputMode="text"
        />
        <FormField
          title="Enter your mobile"
          placeholder="+977 **********"
          inputMode="numeric"
        />

        <TouchableOpacity onPress={openLogin}>
          <Text style={styles.notRegister}>Already Registered?</Text>
        </TouchableOpacity>

        <CustomButton
          title="Send OTP"
          handlePress={() => console.log('Button Pressed')}
          containerStyles={styles.buttonContainer}
          textStyles={styles.buttonText}
          isLoading={false}
          iconname="send-outline"
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
    color: Styles.primary,
    fontSize: 24,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 30,
    rowGap: 10,
  },
  notRegister: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 9,
    textAlign: 'right',
    color: Styles.primary,
  },
  buttonContainer: {
    marginTop: 26,
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

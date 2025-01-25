import {
  View,
  Text,
  TextInput,
  StyleSheet,
  InputModeOptions,
} from 'react-native';
import React from 'react';
import {myColors} from '../styles/colors';

interface FormFieldProps {
  title: string;
  value: string;
  handleChange: (text: string) => void;
  otherStyles?: object;
  placeholder: string;
  inputMode: InputModeOptions | undefined;
  error?: string; // Make it optional
}

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  placeholder,
  inputMode,
  error,
}: FormFieldProps) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={[styles.title, error && {color: myColors.red}]}>
        {title}
      </Text>
      <View
        style={[styles.inputContainer, error && {borderColor: myColors.red}]}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          inputMode={inputMode}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: myColors.black,
    fontWeight: '500',
    marginLeft: 3,
  },
  inputContainer: {
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: myColors.lightwhite,
    borderWidth: 2,
    borderColor: '#D8D8D8',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: myColors.gray,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    color: myColors.red,
  },
});

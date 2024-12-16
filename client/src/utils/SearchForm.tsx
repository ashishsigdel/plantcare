import {
  View,
  Text,
  TextInput,
  StyleSheet,
  InputModeOptions,
} from 'react-native';
import React from 'react';
import {myColors} from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchFormProps {
  value?: string;
  handleChange?: (text: string) => void;
  otherStyles?: object;
  placeholder: string;
  inputMode: InputModeOptions | undefined;
}

const SearchForm = ({
  value,
  handleChange,
  otherStyles,
  placeholder,
  inputMode,
}: SearchFormProps) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={16} color={myColors.gray} />
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

export default SearchForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: myColors.black,
    fontWeight: '600',
    marginLeft: 3,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: myColors.white,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: myColors.gray,
    marginLeft: 10,
  },
});

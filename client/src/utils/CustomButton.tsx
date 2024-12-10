import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {myColors} from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps {
  title: string;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
  iconname?: string;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  iconname,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.buttonContainer,
        containerStyles,
        isLoading ? {opacity: 0.5} : {opacity: 1},
      ]}>
      <Text style={[styles.buttonText, textStyles]}>
        {isLoading ? 'Loading...' : title}
      </Text>
      {iconname && <Icon name={iconname} size={18} color={'white'} />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: myColors.primary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
});

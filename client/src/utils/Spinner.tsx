import {ActivityIndicator} from 'react-native';
import React from 'react';

const Spinner = ({color = '#000'}: {color?: string}) => {
  return <ActivityIndicator size="small" color={color} />;
};

export default Spinner;

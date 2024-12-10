import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator size={'small'} color={'#000'} />
    </View>
  );
};

export default Spinner;

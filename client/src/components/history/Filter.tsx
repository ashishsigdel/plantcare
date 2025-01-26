import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState('7 days');

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterView}>
        {['7 days', '14 days', '30 days'].map(filter => (
          <TouchableOpacity
            activeOpacity={100}
            key={filter}
            style={[
              styles.button,
              selectedFilter === filter && {backgroundColor: myColors.primary},
            ]}
            onPress={() => setSelectedFilter(filter)}>
            <Text
              style={[
                styles.buttonText,
                selectedFilter === filter && {color: myColors.white},
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Icon name="filter" size={20} />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    columnGap: 50,
    paddingHorizontal: 16,
  },
  filterView: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: myColors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: myColors.gray,
    fontWeight: 'bold',
  },
});

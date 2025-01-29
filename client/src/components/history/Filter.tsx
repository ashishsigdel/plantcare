import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {myColors} from '../../styles/colors';

const Filter = ({
  selectedFilter,
  onFilterChange,
}: {
  selectedFilter: any;
  onFilterChange: any;
}) => {
  const filters = ['7', '14', '30'];

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterView}>
        {filters.map(filter => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={filter}
            style={[
              styles.button,
              selectedFilter === filter && {backgroundColor: myColors.primary},
            ]}
            onPress={() => onFilterChange(filter)}>
            <Text
              style={[
                styles.buttonText,
                selectedFilter === filter && {color: myColors.white},
              ]}>
              {filter} days
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View></View>
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

import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {SearchForm} from '../../utils';
import Explore from './Explore';
import RecentScan from './RecentScan';
import {myColors} from '../../styles/colors';
import PlantCare from '../../assets/icons/plantcare.png';

const HomeContent: React.FC = () => {
  const handlePlantCarePress = () => {
    // Add navigation or action for plant care assistance
    console.log('Plant care assistance pressed');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <SearchForm placeholder="Search..." inputMode="text" />

      <Explore />
      <RecentScan />

      <TouchableOpacity
        style={styles.plantCareContainer}
        onPress={handlePlantCarePress}>
        <Image
          source={PlantCare}
          style={styles.plantCareImage}
          resizeMode="contain"
        />

        <View style={styles.plantCareTextContainer}>
          <Text style={styles.plantCareTitle}>
            Looking for additional assistance for your plant?
          </Text>
          <Text style={styles.plantCareSubtitle}>
            Receive accurate solutions to address any issue.
          </Text>
        </View>

        <Icon
          name="chevron-forward"
          size={24}
          color={myColors.gray}
          style={styles.plantCareIcon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  plantCareContainer: {
    backgroundColor: myColors.white,
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantCareImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  plantCareTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  plantCareTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  plantCareSubtitle: {
    fontSize: 14,
    color: myColors.gray,
  },
  plantCareIcon: {
    alignSelf: 'center',
  },
});

export default HomeContent;

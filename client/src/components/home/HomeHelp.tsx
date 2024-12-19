import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import PlantCare from '../../assets/icons/plantcare.png';
import {myColors} from '../../styles/colors';
import {useTranslation} from 'react-i18next';

const HomeHelp = () => {
  const {t} = useTranslation('home');
  const handlePlantCarePress = () => {
    console.log('Plant care assistance pressed');
  };

  return (
    <TouchableOpacity
      style={styles.plantCareContainer}
      onPress={handlePlantCarePress}>
      <Image
        source={PlantCare}
        style={styles.plantCareImage}
        resizeMode="contain"
      />

      <View style={styles.plantCareTextContainer}>
        <Text style={styles.plantCareTitle}>{t('help')}</Text>
        <Text style={styles.plantCareSubtitle}>{t('help-description')}</Text>
      </View>

      <Icon
        name="chevron-forward"
        size={24}
        color={myColors.gray}
        style={styles.plantCareIcon}
      />
    </TouchableOpacity>
  );
};

export default HomeHelp;

const styles = StyleSheet.create({
  plantCareContainer: {
    backgroundColor: myColors.white,
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 130,
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

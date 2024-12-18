import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import diseasesPlant from '../../assets/cauliflower/cauliflower.jpeg';
import {myColors} from '../../styles/colors';
import {BottomBar} from '.';
import {resultData} from '../../data/result';
import cauliflowr from '../../assets/icons/cauliflower.png';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantCare from '../../assets/icons/plantcare.png';

const Result = () => {
  const handlePlantCarePress = () => {
    console.log('Plant care assistance pressed');
  };
  return (
    <View style={styles.container}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.imageContainer}>
          <Image source={diseasesPlant} style={styles.image} />
        </View>

        <View style={styles.plantContainer}>
          <View style={styles.rowWithGap}>
            <Image source={cauliflowr} style={styles.iconImage} />
            <View>
              <Text style={styles.plantName}>{resultData.plant.name}</Text>
              <Text style={styles.scientificName}>
                {resultData.plant['sci-name']}
              </Text>
            </View>
            <Icon
              name="volume-high"
              size={20}
              color={myColors.primary}
              style={styles.soundButton}
            />
          </View>
          <Text style={styles.overview}>{resultData.plant.overview}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.tabcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}>
                <Icon name="bug-outline" size={24} color={myColors.black} />
                <Text style={styles.tabTitle}>Disease Detected:</Text>
                <Text style={styles.diseaseTitle}>
                  {resultData.disease.name}
                </Text>
              </View>
              <Icon name="volume-high" size={20} color={myColors.primary} />
            </View>
            <Text style={styles.overview}>
              {resultData.disease.description}
            </Text>
          </View>

          <View style={styles.tabcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}>
                <Icon name="bonfire" size={24} color={myColors.black} />
                <Text style={styles.tabTitle}>Symptoms</Text>
              </View>
              <Icon name="volume-high" size={20} color={myColors.primary} />
            </View>
            <View style={styles.listContainer}>
              {resultData.disease.symptoms.map((symptom, index) => (
                <Text key={index} style={styles.listItem}>
                  <Icon name="leaf" size={14} color={myColors.primary} />{' '}
                  {symptom}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.tabcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}>
                <Icon name="bulb" size={24} color={myColors.black} />
                <Text style={styles.tabTitle}>Preventions</Text>
              </View>
              <Icon name="volume-high" size={20} color={myColors.primary} />
            </View>
            <View style={styles.listContainer}>
              {resultData.disease.prevention.map((prevention, index) => (
                <Text key={index} style={styles.listItem}>
                  <Icon name="leaf" size={14} color={myColors.primary} />{' '}
                  {prevention}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.tabcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                }}>
                <Icon name="bandage" size={24} color={myColors.black} />
                <Text style={styles.tabTitle}>Pesticides</Text>
              </View>
              <Icon name="volume-high" size={20} color={myColors.primary} />
            </View>
            <View style={styles.listContainer}>
              {resultData.disease.pesticides.map((pesticide, index) => (
                <Text key={index} style={styles.listItem}>
                  <Icon name="leaf" size={14} color={myColors.primary} />{' '}
                  {pesticide}
                </Text>
              ))}
            </View>
            <Text style={styles.overview}>{resultData.disease.medical}</Text>
          </View>
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
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
    position: 'relative',
  },
  imageContainer: {
    height: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  plantContainer: {
    backgroundColor: myColors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 5,
    position: 'relative',
    top: -30,
    marginHorizontal: 10,
  },
  soundButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tabcontainer: {
    backgroundColor: myColors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 5,
    position: 'relative',
    top: -30,
  },
  rowWithGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  plantName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  scientificName: {
    fontSize: 16,
    color: myColors.gray,
    fontWeight: '600',
  },
  overview: {
    fontSize: 16,
    color: myColors['gray-hard'],
    marginTop: 10,
    fontWeight: '500',
  },
  tabTitle: {
    fontSize: 20,
    color: myColors.black,
    fontWeight: 'bold',
  },
  diseaseTitle: {
    fontSize: 20,
    color: myColors.red,
    fontWeight: 'bold',
  },
  listContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    color: myColors['gray-hard'],
    marginBottom: 5,
    fontWeight: '500',
  },
  plantCareContainer: {
    backgroundColor: myColors.white,
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    top: -30,
    marginBottom: 60,
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

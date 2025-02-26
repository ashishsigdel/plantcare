import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import cauliflowerIcon from '../../../assets/icons/cauliflower.png';
import {myColors} from '../../../styles/colors';
import {BottomBar} from '.';
import {resultData} from '../../../data/result';
import cauliflower from '../../../assets/cauliflower/cauliflower.jpeg';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeHelp} from '../../home';
import {useLocale} from '../../../context/TranslationProvider';
import Images from './Images';
import NoDiseaseFound from './NoDiseaseFound';
import useAudioPlayer from './useAudioPlayer';

interface Props {
  result?: any;
}
const screenWidth = Dimensions.get('window').width;

const Result = ({result}: Props) => {
  const {currentLanguage} = useLocale();
  const {playAudio} = useAudioPlayer();

  const images = [result?.plant.reportPatternUrl, result?.plant.plantUrl];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
          <Images images={images} />

          <View style={styles.plantContainer}>
            <View style={styles.rowWithGap}>
              <Image source={cauliflowerIcon} style={styles.iconImage} />
              <View>
                <Text style={styles.plantName}>{result?.plant.name}</Text>
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
              {result?.disease ? (
                <>
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
                      <Icon
                        name="bug-outline"
                        size={24}
                        color={myColors.black}
                      />
                      <Text style={styles.tabTitle}>Disease Detected:</Text>
                    </View>
                    <Icon
                      name="volume-high"
                      size={20}
                      color={myColors.primary}
                    />
                  </View>
                  <Text style={styles.diseaseTitle}>
                    {result?.disease?.name}
                  </Text>
                  <Text style={styles.overview}>
                    {currentLanguage === 'en'
                      ? result?.disease?.diseaseDescription?.descriptionEn
                      : result?.disease?.diseaseDescription?.descriptionNP}
                  </Text>
                </>
              ) : (
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
                    <Text style={styles.tabTitle}>No Disease Detected.</Text>
                  </View>
                </View>
              )}
            </View>

            {result?.disease?.diseaseSymptom && (
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
                  {currentLanguage === 'en'
                    ? result?.disease?.diseaseSymptom?.symptomsEn
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))
                    : result?.disease?.diseaseSymptom?.symptomsNP
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))}
                </View>
              </View>
            )}

            {result?.disease?.diseasePrevention && (
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
                  {currentLanguage === 'en'
                    ? result?.disease?.diseasePrevention?.preventionsEn
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))
                    : result?.disease?.diseasePrevention?.preventionsNP
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))}
                </View>
              </View>
            )}

            {result?.disease?.diseaseCure && (
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
                  {currentLanguage === 'en'
                    ? result?.disease?.diseaseCure?.curesEn
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))
                    : result?.disease?.diseaseCure?.curesNP
                        .split('\n')
                        .map((symptom: any, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            <Icon
                              name="leaf"
                              size={14}
                              color={myColors.primary}
                            />{' '}
                            {symptom}
                          </Text>
                        ))}
                </View>
              </View>
            )}

            <HomeHelp />
          </View>
        </ScrollView>
        <BottomBar />
      </View>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
    position: 'relative',
  },

  content: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  plantContainer: {
    backgroundColor: myColors.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 5,
    position: 'relative',
    top: 10,
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
    fontSize: 25,
    color: myColors.red,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 10,
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
});

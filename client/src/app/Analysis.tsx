import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {asyncStorage} from '../services/asyncStorage';
import {myColors} from '../styles/colors';
import {RootStackParamList} from '../types/navigation';
import {Spinner} from '../utils';

const {width} = Dimensions.get('window');

const Analysis = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [plantPhoto, setPlantPhoto] = useState<string | null>(null);
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const imageHeight = 0.5 * width * 1.5;

  useFocusEffect(
    useCallback(() => {
      const getPhotoURL = async () => {
        const photoURL = await asyncStorage.getItem('CURRENTPHOTO');
        setPlantPhoto(photoURL);
      };
      getPhotoURL();
    }, []),
  );

  useEffect(() => {
    if (plantPhoto) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnimation, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnimation, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('result');
      }, 5000);
    }
  }, [plantPhoto]);

  const translateY = scanLineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, imageHeight],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, {top: insets.top + 10}]}>
        <Icon name="arrow-back" size={32} color={myColors.gray} />
      </TouchableOpacity>

      {plantPhoto ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: plantPhoto}}
            style={styles.capturedImage}
            resizeMode="contain"
          />
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{translateY}],
              },
            ]}
          />
        </View>
      ) : (
        <Text style={styles.noPhotoText}>No photo available</Text>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.waitText}>Scanning...</Text>
          <Spinner color={myColors.white} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.black,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: '90%',
    height: width * 0.5 * 1.5, // Adjust based on aspect ratio.
    overflow: 'hidden', // Ensure scan line is clipped.
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: myColors.blue,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  waitText: {
    marginVertical: 20,
    color: myColors.white,
    fontSize: 16,
  },
  noPhotoText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Analysis;

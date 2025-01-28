import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {myColors} from '../../../styles/colors';
import {GestureResponderEvent} from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../../utils';

const NoCameraFound = ({
  chooseFromGallery,
}: {
  chooseFromGallery: (event: GestureResponderEvent) => void;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, {top: insets.top + 10}]}>
        <Icon name="arrow-back" size={32} color={myColors.gray} />
      </TouchableOpacity>
      <Icon
        name="alert-circle-outline"
        size={60}
        color={myColors.red}
        style={styles.icon}
      />
      <Text style={styles.errorText}>No camera device found!</Text>
      <View style={styles.galleryContainer}>
        <Text style={styles.infoText}>
          You can use images from your gallery:
        </Text>
        <CustomButton
          title="Choose from Gallery"
          handlePress={chooseFromGallery}
          containerStyles={styles.buttonContainer}
          textStyles={styles.buttonText}
          isLoading={false}
          iconname="image"
        />
      </View>
    </SafeAreaView>
  );
};

export default NoCameraFound;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  icon: {
    marginBottom: 20,
  },
  errorText: {
    color: myColors.red,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  galleryContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: myColors.gray,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: myColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: myColors.white,
  },
});

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PhotoFile,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {Spinner} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {myColors} from '../../styles/colors';
import {Linking} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {asyncStorage} from '../../services/asyncStorage';
import {NoCameraFound} from './';

const CameraTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isBackCamera, setIsBackCamera] = useState(true);
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [photo, setPhoto] = useState<PhotoFile | {uri: string} | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    'not-determined' | 'denied' | 'granted'
  >('not-determined');

  const device = useCameraDevice(isBackCamera ? 'back' : 'front');
  const {hasPermission, requestPermission} = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  // Request camera permission
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission = await requestPermission();
        setPermissionStatus(permission ? 'granted' : 'denied');
      } catch (error) {
        console.error('Permission request error:', error);
        setPermissionStatus('denied');
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (photo) {
      const photoUri = 'uri' in photo ? photo.uri : photo.path;

      const photoAction = async () => {
        await asyncStorage.setItem('CURRENTPHOTO', photoUri);
        navigation.navigate('analysis');
      };

      photoAction();
    }
  }, [photo, navigation]);

  const handlePermissionDenied = () => {
    Alert.alert(
      'Camera Permission Required',
      'Please enable camera access in your device settings to use this feature.',
      [
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ],
    );
  };

  if (permissionStatus === 'denied') {
    handlePermissionDenied();
    return null;
  }

  if (permissionStatus === 'not-determined') {
    return (
      <View style={styles.containerSpinner}>
        <Spinner />
      </View>
    );
  }

  const toggleCamera = () => {
    setIsBackCamera(prev => !prev);
  };

  const toggleFlashMode = () => {
    setFlashMode(prevFlash => {
      if (prevFlash === 'off') return 'on';
      if (prevFlash === 'on') return 'auto';
      return 'off';
    });
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const capturedPhoto = await cameraRef.current.takePhoto({
          flash: flashMode,
        });
        setPhoto(capturedPhoto);
      } catch (error) {
        console.log('Failed to take photo:', error);
        Alert.alert(
          'Camera Error',
          'Failed to capture photo. Please try again.',
        );
      }
    }
  };

  const chooseFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedPhoto = response.assets ? response.assets[0] : null;
        if (selectedPhoto && selectedPhoto.uri) {
          setPhoto({uri: selectedPhoto.uri});
        }
      }
    });
  };

  if (!device) {
    return <NoCameraFound chooseFromGallery={chooseFromGallery} />;
  }
  return (
    <>
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.cameraPreview}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={styles.focusBracketContainer}>
          <View style={styles.focusBracketTopLeft} />
          <View style={styles.focusBracketTopRight} />
          <View style={styles.focusBracketBottomLeft} />
          <View style={styles.focusBracketBottomRight} />
        </View>

        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={38} color={myColors.white} />
          </TouchableOpacity>

          <View style={styles.rightControl}>
            <TouchableOpacity onPress={toggleCamera}>
              <Icon name="camera-reverse" size={30} color={myColors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleFlashMode}
              style={{
                position: 'relative',
              }}>
              <Icon
                name={
                  flashMode === 'off'
                    ? 'flash-off'
                    : flashMode === 'on'
                    ? 'flash'
                    : 'flash'
                }
                size={30}
                color={myColors.white}
              />
              {flashMode === 'auto' && (
                <Text
                  style={{
                    position: 'absolute',
                    top: 15,
                    right: 0,
                    color: myColors.white,
                    fontWeight: '600',
                  }}>
                  A
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomControlPanel}>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={chooseFromGallery}>
              <Icon name="image" size={32} color={myColors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={takePhoto} style={styles.shutterButton}>
              <Icon name="camera" size={40} color={myColors.black} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('camera-guide')}
              style={styles.infoButton}>
              <Icon name="information" size={24} color={myColors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar barStyle={'light-content'} />
    </>
  );
};

const styles = StyleSheet.create({
  cameraPreview: {
    height: '80%',
    width: '100%',
  },
  bottomControlPanel: {
    height: '20%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSpinner: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  focusBracketContainer: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    right: '25%',
    bottom: '45%',
    justifyContent: 'space-between',
  },
  focusBracketTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    width: 50,
    height: 50,
    borderColor: 'white',
  },
  focusBracketTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    width: 50,
    height: 50,
    borderColor: 'white',
  },
  focusBracketBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    width: 50,
    height: 50,
    borderColor: 'white',
  },
  focusBracketBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    width: 50,
    height: 50,
    borderColor: 'white',
  },
  topNav: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightControl: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: myColors.primary,
    opacity: 0.8,
  },
  errorText: {
    color: myColors.red,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default CameraTab;

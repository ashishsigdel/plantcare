import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CameraTab} from './camera';
import {PhotoFile} from 'react-native-vision-camera';
import {asyncStorage} from '../../services/asyncStorage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {Processing} from './processing';
import {Spinner} from '../../utils';
import {myAxios} from '../../services/apiServices';
import {Result} from './result';

const ControllTab = () => {
  const [whichTab, setWhichTab] = useState<'processing' | 'result'>(
    'processing',
  );
  const [result, setResult] = useState({});

  const [photoURI, setPhotoURI] = useState<string | null>(null);

  useEffect(() => {
    const getPhoto = async () => {
      const photo = await asyncStorage.getItem('currentphoto');
      setPhotoURI(photo);
      const formData = new FormData();
      formData.append('picture', {
        uri: photo,
        type: 'image/jpeg', // Change according to image format
        name: 'photo.jpg',
      });
      try {
        const response = await myAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setResult(response.data.data);
        setWhichTab('result');
      } catch (error) {
        console.log('Upload Error:', error);
      }
    };
    getPhoto();
  }, []);

  if (!photoURI) {
    return <Spinner />;
  }

  return whichTab === 'processing' ? (
    <Processing photo={photoURI} />
  ) : (
    result && <Result result={result} />
  );
};

export default ControllTab;

const styles = StyleSheet.create({});

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {Styles} from '../../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import logo from '../../../assets/images/logo.png';
import {Spinner} from '../../components/utils';

const Splash = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'tab'>>();
  const accessToken = 'dfsdfs';

  useEffect(() => {
    setTimeout(() => {
      if (accessToken) {
        navigation.navigate('tab');
      } else {
        navigation.navigate('auth');
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={logo}
            alt="Person"
            width={24}
            height={24}
            style={styles.logo}
          />
          <View style={styles.loadingContainer}>
            <Spinner />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.white,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 5,
  },
});

export default Splash;

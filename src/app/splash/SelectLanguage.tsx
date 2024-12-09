import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Styles} from '../../../assets/colors/colors';
import nepalflag from '../../../assets/images/flags/nepal.png';
import usaflag from '../../../assets/images/flags/usa.png';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const SelectLanguage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'auth'>>();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const accessToken = '';

  const handleContinue = async () => {
    if (accessToken) {
      navigation.navigate('tab');
    } else {
      navigation.navigate('auth');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>भाषा रोज्नुहोस् / Choose Language</Text>

      <View style={styles.languageOptions}>
        <TouchableOpacity
          style={[
            styles.languageCard,
            selectedLanguage === 'en' && styles.selectedCard,
          ]}
          onPress={() => setSelectedLanguage('en')}>
          <Image source={usaflag} style={styles.flag} />
          <View>
            <Text style={styles.languageText}>English</Text>
            <Text style={styles.subText}>अंग्रेजी</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageCard,
            selectedLanguage === 'np' && styles.selectedCard,
          ]}
          onPress={() => setSelectedLanguage('np')}>
          <Image source={nepalflag} style={styles.flag} />
          <View>
            <Text style={styles.languageText}>नेपाली</Text>
            <Text style={styles.subText}>Nepali</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueText}>अगाडि बढ्नुहोस् / CONTINUE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  languageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    width: '48%',
    justifyContent: 'space-around',
  },
  selectedCard: {
    borderColor: '#0F834D',
  },
  flag: {
    width: 30,
    maxHeight: 20,
    marginRight: 10,
    objectFit: 'contain',
  },
  languageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: Styles.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

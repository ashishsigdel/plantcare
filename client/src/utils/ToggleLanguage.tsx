import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {myColors} from '../styles/colors';
import enFlag from '../assets/flags/usa.png';
import npFlag from '../assets/flags/nepal.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {asyncStorage} from '../services/asyncStorage';
import {useLocale} from '../context/TranslationProvider';
import {LanguageToggle} from '../components/modal';

const ToggleLanguage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation('toggle-language');
  const {currentLanguage, changeLanguage} = useLocale();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectLanguage = async (language: string) => {
    await asyncStorage.setItem('USER_LANGUAGE', language);
    changeLanguage(language);
    setModalVisible(false);
  };

  return (
    <>
      {/* Language Toggle */}
      <TouchableOpacity style={styles.toggleContainer} onPress={toggleModal}>
        <Image
          source={currentLanguage === 'en' ? enFlag : npFlag}
          style={styles.flagIcon}
        />
        <Text style={styles.languageText}>{t('lang')}</Text>
        <Icon name="caret-down" size={16} color={myColors.gray} />
      </TouchableOpacity>

      <LanguageToggle
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default ToggleLanguage;

const styles = StyleSheet.create({
  toggleContainer: {
    borderWidth: 2,
    borderColor: myColors.gray,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    position: 'absolute',
    right: 15,
  },
  flagIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  languageText: {
    fontSize: 14,
    color: myColors.gray,
    fontWeight: '500',
    marginHorizontal: 4,
  },
});

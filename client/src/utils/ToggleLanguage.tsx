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

      {/* Bottom Sheet */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View
            style={{
              borderWidth: 3,
              borderColor: myColors.gray,
              width: 40,
              borderRadius: 999,
              marginBottom: 20,
              opacity: 0.5,
            }}></View>

          <Text style={styles.modalTitle}>{t('choose')}</Text>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => selectLanguage('en')}>
            <Image source={enFlag} style={styles.flagIcon} />
            <Text style={styles.languageOptionText}>English</Text>
            {currentLanguage === 'en' && (
              <Icon
                name="checkmark"
                size={16}
                color={myColors.white}
                style={{
                  backgroundColor: myColors.primary,
                  padding: 1,
                  borderRadius: 999,
                  position: 'absolute',
                  right: 10,
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => selectLanguage('np')}>
            <Image source={npFlag} style={styles.flagIcon} />
            <Text style={styles.languageOptionText}>नेपाली</Text>
            {currentLanguage === 'np' && (
              <Icon
                name="checkmark"
                size={16}
                color={myColors.white}
                style={{
                  backgroundColor: myColors.primary,
                  padding: 1,
                  borderRadius: 999,
                  position: 'absolute',
                  right: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: myColors.white,
    padding: 20,
    paddingBottom: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  languageOptionText: {
    fontSize: 16,
    color: myColors.black,
    marginLeft: 30,
  },
  modalTitle: {
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: 600,
  },
});

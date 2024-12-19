import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocale} from '../../context/TranslationProvider';
import {asyncStorage} from '../../services/asyncStorage';
import {myColors} from '../../styles/colors';
import enFlag from '../../assets/flags/usa.png';
import npFlag from '../../assets/flags/nepal.png';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  toggleModal: any;
}

const LanguageToggle = ({
  isModalVisible,
  setModalVisible,
  toggleModal,
}: Props) => {
  const {t} = useTranslation('toggle-language');
  const {currentLanguage, changeLanguage} = useLocale();

  const selectLanguage = async (language: string) => {
    await asyncStorage.setItem('USER_LANGUAGE', language);
    changeLanguage(language);
    setModalVisible(false);
  };
  return (
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
  );
};

export default LanguageToggle;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  flagIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
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

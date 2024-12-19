import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {myColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {LanguageToggle} from '../modal';
import {useTranslation} from 'react-i18next';

const General = () => {
  const {t} = useTranslation('settings');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'auth'>>();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('general')}</Text>
      <View style={styles.listContainer}>
        <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon
            name="language-outline"
            size={20}
            color={myColors['gray-hard']}
          />
          <Text style={styles.listItemText}>{t('language')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <LanguageToggle
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          toggleModal={toggleModal}
        />
        <TouchableOpacity
          onPress={() => Linking.openSettings()}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon name="cog-outline" size={20} color={myColors['gray-hard']} />
          <Text style={styles.listItemText}>{t('allow')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon name="cloud-outline" size={20} color={myColors['gray-hard']} />
          <Text style={styles.listItemText}>{t('cache')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          activeOpacity={0.7}
          style={styles.listItem}>
          <Icon name="image-outline" size={20} color={myColors['gray-hard']} />
          <Text style={styles.listItemText}>{t('auto-save')}</Text>
          <Icon
            name="chevron-forward"
            size={20}
            color={myColors['gray-hard']}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default General;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 20,
    color: myColors.gray,
  },
  listContainer: {
    marginTop: 10,
    backgroundColor: myColors.white,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: myColors.lightwhite,
    position: 'relative',
  },
  listItemText: {
    fontSize: 16,
    color: myColors['gray-hard'],
    fontWeight: '500',
  },
  chevronIcon: {
    position: 'absolute',
    right: 20,
  },
});

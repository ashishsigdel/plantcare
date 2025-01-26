import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {myColors} from '../styles/colors';
import {RootStackParamList} from '../types/navigation';

interface Props {
  title: string;
  back?: boolean;
}

const TopBar = ({title, back = true}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation('settings');
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 20,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} size={20} color={myColors['gray-hard']} />
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: 20,
          color: myColors.gray,
          fontWeight: 600,
          letterSpacing: 2,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: myColors.white,
    position: 'relative',
  },
});

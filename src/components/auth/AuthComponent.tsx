import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopSection from './TopSection';
import {Styles} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import Register from './Register';

const AuthComponent = () => {
  const [openTab, setOpenTab] = useState<'login' | 'register'>('login');
  const openLogin = () => setOpenTab('login');
  const openRegister = () => setOpenTab('register');
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        <TopSection />
      </SafeAreaView>

      <View style={styles.tabContainer}>
        {openTab === 'login' ? (
          <Login openRegister={openRegister} />
        ) : openTab === 'register' ? (
          <Register openLogin={openLogin} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default AuthComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.lightwhite,
  },
  topContainer: {
    flex: 1,
    backgroundColor: Styles.lightwhite,
  },
  tabContainer: {
    backgroundColor: Styles.white,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    paddingBottom: 30,
    position: 'relative',
    bottom: 0,
    height: '60%',
  },
  loginContainer: {
    width: '100%',
    marginHorizontal: 'auto',
  },
});

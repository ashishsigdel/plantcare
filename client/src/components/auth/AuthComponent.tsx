import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Login, Register, TopSection} from './';
import {myColors} from '../../styles/colors';

const AuthComponent = () => {
  const [openTab, setOpenTab] = useState<'login' | 'register'>('login');
  const openLogin = () => setOpenTab('login');
  const openRegister = () => setOpenTab('register');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={styles.topContainer}>
          <TopSection />
        </SafeAreaView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.tabContainer}>
              {openTab === 'login' ? (
                <Login openRegister={openRegister} />
              ) : (
                <Register openLogin={openLogin} />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.lightwhite,
  },
  topContainer: {
    flex: 0.7,
    backgroundColor: myColors.lightwhite,
  },
  tabContainer: {
    backgroundColor: myColors.white,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    flex: 1.3,
  },
});

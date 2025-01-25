import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {asyncStorage} from '../services/asyncStorage';
import {myColors} from '../styles/colors';
import TopBar from '../utils/TopBar';
import defaultProfile from '../assets/defaultProfile.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const user = await asyncStorage.getItem('user');
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <TopBar title="Profile" />
        <View style={styles.container}>
          <View style={styles.profileSection}>
            <Image
              style={styles.profilePic}
              source={
                user?.profilePic ? {uri: user.profilePic} : defaultProfile
              }
              width={300}
              height={300}
            />
            <Text style={styles.fullname}>
              {user?.fullName || 'Guest User'}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={{marginBottom: 4, fontWeight: '500', fontSize: 18}}>
              More Details:
            </Text>
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={18} color={myColors.black} />
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email || 'Not available'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={18} color={myColors.black} />
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{user.phone || 'Not available'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="person-outline"
                size={18}
                color={myColors.black}
              />
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{user.role || 'Not available'}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: myColors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: myColors.lightwhite,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fullname: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: '700',
    color: myColors.black,
  },
  detailsContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: myColors.lightwhite,
    borderRadius: 12,
    rowGap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: myColors.black,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: myColors.gray,
  },
});

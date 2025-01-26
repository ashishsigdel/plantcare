import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {asyncStorage} from '../services/asyncStorage';

const RequireAuth: React.FC<{children: React.ReactNode}> = ({children}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'tabs'>>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const accessToken = await asyncStorage.getItem('accessToken');
      const user = await asyncStorage.getItem('user');

      if (accessToken && user) {
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        navigation.navigate('auth');
      }
    };

    checkAuth();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;

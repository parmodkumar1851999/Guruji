import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Routes from './Src/Navigations/Routes';
import {Provider} from 'react-redux';
import './i18n';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import {store} from './Src/redux/store';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import ImagePath from './Src/Constants/ImagePath';
import {hp} from './Src/Constants/Responsive';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState(null);

  useEffect(() => {
    requestNotificationPermissionn();
  }, []);
  const requestNotificationPermissionn = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("Notification permission granted");
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn('Permission request failed', err);
      }
    } else {
      console.log(
        'No need to request notification permission for this version',
      );
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  };
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('Fcm Token:..', token);
  };
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification received in foreground:', remoteMessage);
    });
    return unsubscribe;
  }, []);

  // ddddddddddddddddddddddddddd

  useEffect(() => {
    requestNotificationPermission();
  }, []);
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn('Permission request failed', err);
      }
    } else {
      console.log(
        'No need to request notification permission for this version',
      );
    }
  };

  // ########################
  useEffect(() => {
    // setTimeout(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });
    return () => {
      unsubscribe();
    };
    // }, -2000);
  }, []);

  LogBox.ignoreLogs(['warning']);
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      {isConnected &&
      (connectionType === 'wifi' || connectionType === 'cellular') ? (
        <View style={{flex: 1}}>
          <Routes />
          <Toast />
          {/* <ZPractice /> */}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '30%', height: hp(20)}}>
            <FastImage
              source={ImagePath.errorInternNetGif}
              style={styles.EnventImg01}
              resizeMode="contain"
            />
          </View>
          <Text style={{textAlign: 'center', fontSize: hp(2.2)}}>
            No Internet connection.
          </Text>
        </View>
      )}
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  EnventImg01: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
});

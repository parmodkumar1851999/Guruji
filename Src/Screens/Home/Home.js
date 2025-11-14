import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import StatusBarCom from '../../Components/StatusBarCom';
import VectorIcon from '../../Constants/VectorIcon';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import SliderAutoPlay from '../../Components/SliderAutoPlay';
import ShareSocialMediaCom from '../../Components/ShareSocialMediaCom';
import OfferCom from '../../Components/OfferCom';
import {t} from 'i18next';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import {ToastCom} from '../../Components/ToastCom';
import {ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeVideosTop from './HomeVideosTop';
import HomeVideosTrending from './HomeVideosTrending';
import HomeVideosLatest from './HomeVideosLatest';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoaderCom from '../../Components/LoaderCom';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import InAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';

const inAppUpdates = new InAppUpdates(false); // isDebug: false
export const checkForMandatoryUpdate = async () => {
  try {
    const result = await inAppUpdates.checkNeedsUpdate();
    if (result.shouldUpdate) {
      if (Platform.OS === 'android') {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.IMMEDIATE,
        });
      } else {
        // iOS Alert
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                // Redirect to App Store
                Linking.openURL('https://apps.apple.com/app/idYOUR_APP_ID');
                BackHandler.exitApp();
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  } catch (error) {
    // console.log('Update check error:', error);  you can uncommit this

    // Handle case when Google Play blocks install due to battery/disk (error -6)
    if (Platform.OS === 'android') {
      // Alert.alert(
      //   'Cannot Update Now',
      //   'Please check your battery level or storage. The update cannot proceed.',
      //   [{ text: 'Exit', onPress: () => BackHandler.exitApp() }],
      //   { cancelable: false }
      // );
    }
  }
};

// #####################################
const Home = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState(false);

  // Api calling badely will will think for removing this
  useEffect(() => {
    checkForMandatoryUpdate();
    _getUserData();
  }, []);
  const _getUserData = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      setIsLoading(true);
      setIsRefreshing(true);
      const response = await fetch(ApiUrl.userGetDetailsApi, {
        method: 'Get',
        // body: fd,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
      const result = await response.json();
      // console.log('register success...', result?.data?.fullName);
      setUserName(result?.data?.fullName);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error('error Home..', error);
      setApiError(true);
      ToastCom({type: 'error', text2: result?.message});
    } finally {
      setIsLoading(false);
    }
  };
  // Api calling badely will will think for removing this
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    requestUserPermission();
  });
  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      // console.log('Notification permission granted');
    } else {
      // console.log('Notification permission denied');
      showPermissionAlert();
    }
  };
  // new code for push Notifaction START %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const showPermissionAlert = () => {
    Alert.alert(
      'Permission Required',
      'Please enable app permissions in your settings to receive notifications.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Settings',
          onPress: openSettings,
        },
      ],
      {cancelable: false},
    );
  };
  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openSettings();
    } else if (Platform.OS === 'android') {
      Linking.openURL('app-settings:');
    }
  };
  const checkInitialNotification = async () => {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      // console.log('App opened from a notification:', remoteMessage);
    }
  };
  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        // console.log('Notification permission granted');
      } else {
        // console.log('Notification permission denied');
        showPermissionAlert();
      }
    };

    const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setSendFcmTokenToBackend(fcmToken);
      } else {
        console.log('No FCM token available');
      }
    };

    // Create a default notification channel for Android
    const createNotificationChannel = async () => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        vibration: true,
      });
      console.log('Notification channel created:', channelId);
    };

    createNotificationChannel();
    requestUserPermission();
    getFcmToken();
    checkInitialNotification();

    const foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Received foreground notification:', remoteMessage);
      Toast.show({
        type: 'success',
        text1: `${remoteMessage.notification.title}`,
        text2: `${remoteMessage.notification.body}`,
      });

      // Display Notification using Notifee
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: ImagePath.CardImg01,
          smallIcon: ImagePath.EBookDownloadImg,
        },
      });
      // Display Toast on Android
      if (Platform.OS === 'android') {
        Toast.show({
          type: 'success',
          text1: `${remoteMessage.notification.title}`,
          text2: `${remoteMessage.notification.body}`,
        });
      }
    });
    const backgroundUnsubscribe = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
      },
    );
    return () => {
      foregroundUnsubscribe();
      backgroundUnsubscribe();
    };
  }, []);
  // new code for push Notifaction END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  // page reload for updated data calling  focuse Api  Start
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        _getUserData();
        return false;
      },
    );
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      _getUserData();
      Alert.alert('Confirm exit', 'Do you want to go back?', [
        {text: 'Cancel', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return () => {
      backHandler.remove();
      navigation.removeListener('beforeRemove');
    };
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      _getUserData();
      return;
    }, []),
  );
  // page reload for updated data calling  focuse Api  End

  // ###################################################################################

  useEffect(() => {
    checkForMandatoryUpdate();
  }, []);
  if (isLoading) {
    return <ActivityIndicator size="large" color="rgba(255,144,18,1)" />;
  }
  if (apiError) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          backgroundColor: Colors.Black,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={ImagePath.ServerErorrGif}
          style={[styles.ServerImg, {alignSelf: 'center'}]}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: hp(1.8),
            paddingHorizontal: wp(2),
            color: 'red',
            textAlign: 'center',
            fontFamily: Fonts.PoppinsBold700,
          }}>
          ⚠️ Our services are temporarily unavailable. {'\n'} Please try again
          shortly.
        </Text>
        <TouchableOpacity onPress={() => _getUserData()}>
          <Text
            style={{
              paddingVertical: wp(2),
              paddingHorizontal: wp(5),
              borderRadius: wp(1),
              color: '#fff',
              marginTop: hp(5),
              cursor: 'pointer',
              backgroundColor: 'rgba(33, 37, 231, 0.9)',
            }}>
            {' '}
            Refress Page
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <AppWapper containerProps={{backgroundColor: Colors.WhiteLight}}>
      <StatusBarCom
        backgroundColor={Colors.Primary}
        barStyle={'light-content'}
      />
      {/* Header Start here . */}
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View style={{marginBottom: hp(7)}}>
          <View style={[styles.headerContianer]}>
            <View style={{width: '41.33%'}}>
              <Text style={styles.headrHomeTxt}>{t('Home')}</Text>
              <Text
                style={[
                  styles.headrHomeTxt,
                  styles.headrUserTxt,
                  {width: '100%'},
                ]}
                numberOfLines={1}>
                {t('Hii')}, {userName ? userName : `User`}
              </Text>
            </View>
            <View
              style={{
                width: '33.33%',
                alignItems: 'flex-start',
                paddingLeft: wp(5),
              }}>
              <View style={styles.gurujiOuter}>
                <FastImage
                  source={ImagePath.GurujiImg}
                  style={[styles.GurujiImg, {alignSelf: 'center'}]}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => alert('Alert')}
              style={{width: '26%'}}>
              {/* <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'bell-badge-outline'}
                size={28}
                color={Colors.White}
                style={{alignItems: 'flex-end'}}
              /> */}
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={_getUserData}
              />
            }
            style={{marginLeft: wp(4), marginBottom: hp(7)}}>
            <View style={{}}>
              <SliderAutoPlay />   
            </View>
            <HomeVideosTop />
            <HomeVideosTrending />
            <HomeVideosLatest />
            <Text style={styles.FollowUsTxt}>{t('FollowUs')}</Text>
            <View
              style={{
                marginBottom: hp(5),
                marginTop: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '94%',
              }}>
              <ShareSocialMediaCom
                // onPress={() => alert('sc-facebook')}
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/UMANGMEDIA')
                }
                type={'EvilIcons'}
                name={'sc-facebook'}
                iconContianerProps={{backgroundColor: '#337FFF'}}
              />
              <ShareSocialMediaCom
                // onPress={() => alert('whatsapp')}
                onPress={() =>
                  Linking.openURL(
                    'https://whatsapp.com/channel/0029VaDR26nCsU9M4oIS2e0p',
                  )
                }
                type={'FontAwesome'}
                name={'whatsapp'}
                iconContianerProps={{backgroundColor: '#00D95F'}}
              />
              <ShareSocialMediaCom
                // onPress={() => alert('twitter')}
                onPress={() => Linking.openURL('https://x.com/umangmedia')}
                type={'AntDesign'}
                name={'twitter'}
                iconContianerProps={{backgroundColor: '#33CCFF'}}
              />
              <ShareSocialMediaCom
                // onPress={() => alert('instagram')}
                onPress={() => Linking.openURL('https://www.instagram.com/')}
                type={'AntDesign'}
                name={'instagram'}
                iconContianerProps={{backgroundColor: '#A809DC'}}
              />
              <ShareSocialMediaCom
                onPress={() =>
                  Linking.openURL(
                    'https://youtube.com/@tvshambhusharanlataji9735?si=g_XBEw9CYWr9mvog',
                  )
                }
                type={'AntDesign'}
                name={'youtube'}
                iconContianerProps={{backgroundColor: '#D00000'}}
              />
              <ShareSocialMediaCom
                onPress={() => Linking.openURL('https://www.umangmedia.com')}
                type={'AntDesign'}
                name={'earth'}
                iconContianerProps={{backgroundColor: '#27c6cd'}}
              />
            </View>
          </ScrollView>
        </View>
      )}
      {/* Offer Call here write in End */}
      <OfferCom
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      />
    </AppWapper>
  );
};

export default Home;
const styles = StyleSheet.create({
  headerContianer: {
    backgroundColor: Colors.Primary,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headrHomeTxt: {
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2),
    color: Colors.White,
  },
  headrUserTxt: {
    marginTop: hp(-1),
    fontFamily: Fonts.InterBold700,
    fontFamily: Fonts.PoppinsBold700,
    fontSize: hp(2.5),
  },
  offerContianer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    position: 'absolute',
    height: '75%',
    width: '100%',
  },
  gurujiOuter: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(14),
    borderWidth: 2,
    borderColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GurujiImg: {
    width: wp(13),
    height: wp(13),
    marginLeft: wp(-0.3),
    marginTop: wp(-0.3),
    borderRadius: wp(5),
  },
  ServerImg: {
    width: wp(100),
    height: hp(40),
    marginTop: hp(-10),
    resizeMode: 'contain',
  },
  FollowUsTxt: {
    color: Colors.Primary,
    fontSize: hp(2.5),
    marginLeft: wp(1),
    textTransform: 'capitalize',
    fontFamily: Fonts.InterBold700,
  },
});

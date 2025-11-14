import {
  Alert,
  BackHandler,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import ImagePath from '../../Constants/ImagePath';
import {hp, wp} from '../../Constants/Responsive';
import StatusBarCom from '../../Components/StatusBarCom';
import VectorIcon from '../../Constants/VectorIcon';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import ProfilesButtonCom from '../../Components/ProfilesButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import ModalCom from '../../Components/ModalCom';
import ShareSocialMediaCom from '../../Components/ShareSocialMediaCom';
import ButtonCom from '../../Components/ButtonCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../../redux/Slice/LoginSlice';
import LoaderCom from '../../Components/LoaderCom';
import {useDispatch} from 'react-redux';
import {setIsLocal} from '../../redux/Slice/LocalSlice';
import {ApiUrl} from '../../Utils/apiurl';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import SelectLangModal from '../../Components/SelectLangModal';

const iconWidthHeight = wp(15);
const iconSizeWidthHeight = wp(8);
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState('');
  const [selectLanguage, setSelectLanguage] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    _getUserData();
    checkLng();
  }, []);
  const _getUserData = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
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
      setProfileData(result?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      // ToastCom({type: 'error', text2: result?.message});
    }
  };

  const checkLng = async () => {
    const x = await AsyncStorage.getItem('LANG');
    if (x != null) {
      i18n.changeLanguage(x);
      let lng =
        x == 'en' ? 'English' : x == 'hi' ? 'हिंदी' : setSelectLanguage(lng);
    }
  };
  const {t, i18n} = useTranslation();
  const handleLanguageChange = async lang => {
    try {
      i18n.changeLanguage(lang);
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error changing language', error);
    }
  };

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

  const _profileUpdate = () => {
    navigation.navigate(ScreensName.PROFILEUPDATE);
  };
  const _logout = () => {
    setLoading(true);
    setTimeout(() => {
      AsyncStorage.removeItem('token');
      dispatch(setLogin(false));
      dispatch(setIsLocal(false));
      setLoading(false);
    }, 3000);
  };

  const profileWarningLocalLogin = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      if (token) {
        _profileUpdate();
      } else {
        Alert.alert('Alert Profile ', `${t('alertLocalLogin')}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => _logout()},
        ]);
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
    }
  };
  const changePasswordWarningLocalLogin = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      if (token) {
        navigation.navigate(ScreensName.PASSWORDCHANGE)();
      } else {
        Alert.alert('Alert Profile ', `${t('alertLocalLogin')}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => _logout()},
        ]);
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
    }
  };

  return (
    <AppWapper>
      <StatusBarCom />
      <HeaderCom
          type={'Ionicons'}
          name={'chevron-back'}
          onPress={() => navigation.goBack()}
          labelCenter={t('myProfile')}
          // propsContainer={{backgroundColor: null}}
        />
      {/* <ImageBackground
        source={ImagePath.OfferBgImg}
        style={styles.backgroundImgContianer}>
        <HeaderCom
          type={'Ionicons'}
          name={'chevron-back'}
          onPress={() => navigation.goBack()}
          labelCenter={t('myProfile')}
          propsContainer={{backgroundColor: null}}
        />
        <View style={styles.imgTxtContainer}>
          {loading ? (
            <LoaderCom colorProps={{color: Colors.White}} />
          ) : (
            <View style={[styles.imgTxtContianer]}>
              <View style={[styles.imgTxtContianer, {width: '28%'}]}>
                {profileData?.uploadedFile ? (
                  <View style={styles.imgTxtContianer}>
                    <TouchableOpacity
                      onPress={() => profileWarningLocalLogin()}>
                      <FastImage
                        source={{uri: profileData?.uploadedFile}}
                        style={styles.vactorIcon}
                      />
                    </TouchableOpacity>
                    <VectorIcon
                      type={'Entypo'}
                      name={'edit'}
                      color={Colors.Primary}
                      size={15}
                      style={styles.vactorIconEdit}
                      onPress={() => profileWarningLocalLogin()}
                    />
                  </View>
                ) : (
                  <View style={styles.imgTxtContianer}>
                    <VectorIcon
                      type={'FontAwesome'}
                      name={'user-circle-o'}
                      color={Colors.Gray}
                      size={90}
                      style={styles.vactorIcon}
                      onPress={() => profileWarningLocalLogin()}
                    />
                    <VectorIcon
                      type={'Entypo'}
                      name={'edit'}
                      color={Colors.Primary}
                      size={15}
                      style={styles.vactorIconEdit}
                      onPress={() => profileWarningLocalLogin()}
                    />
                  </View>
                )}
              </View>
              <View style={[styles.useContentContainer, {width: '40%'}]}>
                <Text
                  style={[styles.userName, {width: '100%'}]}
                  numberOfLines={1}>
                  {profileData?.fullName ? profileData?.fullName : 'Jane Doe'}
                </Text>
                <Text style={[styles.userName, styles.userMobile]}>
                  +91{' '}
                  {profileData?.mobile ? profileData?.mobile : '123 567 89000'}
                </Text>
                <Text
                  style={[styles.userName, styles.userMobile]}
                  numberOfLines={1}>
                  {' '}
                  {profileData?.email
                    ? profileData?.email
                    : 'Janedoe@example.com'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ImageBackground> */}
      <ScrollView style={styles.profileBtnContianer}>
        {/* <ProfilesButtonCom
          type={'FontAwesome'}
          name={'user-o'}
          labal={t('Profile')}
          // onPress={() => _profileUpdate()}
          onPress={() => profileWarningLocalLogin()}
        /> */}
        <ProfilesButtonCom
          type={'MaterialIcons'}
          name={'policy'}
          labal={t('PrivacyPolicy')}
          size={30}
          onPress={() => navigation.navigate(ScreensName.PRIVACYPOLICY)}
        />
        <ProfilesButtonCom
          type={'Feather'}
          name={'lock'}
          labal={t('TermsAndConditions')}
          onPress={() => navigation.navigate(ScreensName.TERMSANDCONDITIONS)}
        />
        {/* <ProfilesButtonCom
          type={'MaterialIcons'}
          name={'password'}
          labal={t('PasswordChange')}
          // onPress={() => navigation.navigate(ScreensName.PASSWORDCHANGE)}
          onPress={() => changePasswordWarningLocalLogin()}
        /> */}
        <ProfilesButtonCom
          type={'MaterialCommunityIcons'}
          name={'help'}
          labal={t('Help')}
          onPress={() => navigation.navigate(ScreensName.HELPCENTER)}
        />
        <ProfilesButtonCom
          type={'Feather'}
          name={'users'}
          labal={t('InviteFriends')}
          onPress={() => setIsVisible(true)}
        />
        <ProfilesButtonCom
          type={'FontAwesome'}
          name={'language'}
          labal={t('ChosseLangauage')}
          onPress={() => setShowModal(true)}
        />
        {/* <ProfilesButtonCom
          type={'MaterialCommunityIcons'}
          name={'logout'}
          labal={t('Logout')}
          onPress={() => setIsLogout(true)}
        /> */}
        <Text style={styles.footer} />
      </ScrollView>

      {/* Modal Social Media Start*/}
      <ModalCom
        contianerStyle={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.modalTitle}>{t('InviteFriends')}</Text>
          <Text style={styles.modalTitle02}>
            {t('InviteFriendsEasilyTitle')}
          </Text>
          <Text style={styles.modalPara}>{t('InviteFriendsEasily')}</Text>
          <View style={styles.socialMeadiaContianer}>
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://x.com/')}
              type={'AntDesign'}
              name={'twitter'}
              iconContianerProps={{
                backgroundColor: '#33CCFF',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://www.facebook.com/')}
              type={'EvilIcons'}
              name={'sc-facebook'}
              iconContianerProps={{
                backgroundColor: '#337FFF',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://www.whatsapp.com/')}
              type={'FontAwesome'}
              name={'whatsapp'}
              iconContianerProps={{
                backgroundColor: '#00D95F',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://www.messenger.com/')}
              type={'Fontisto'}
              name={'messenger'}
              iconContianerProps={{
                backgroundColor: '#00a3f7',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() =>
                Linking.openURL('https://en.wikipedia.org/wiki/Game_controller')
              }
              type={'Entypo'}
              name={'game-controller'}
              iconContianerProps={{
                backgroundColor: '#6D4AC7',
                padding: 10,
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
          </View>
          <View style={styles.socialMeadiaContianer}>
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://www.skype.com/en/')}
              type={'AntDesign'}
              name={'skype'}
              iconContianerProps={{
                backgroundColor: '#337FFF',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://telegram.org/')}
              type={'FontAwesome'}
              name={'telegram'}
              iconContianerProps={{
                backgroundColor: '#00D95F',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() =>
                Linking.openURL('https://hybrismart.com/message1/')
              }
              type={'AntDesign'}
              name={'message1'}
              iconContianerProps={{
                backgroundColor: '#33CCFF',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() => Linking.openURL('https://www.instagram.com/')}
              type={'AntDesign'}
              name={'instagram'}
              iconContianerProps={{
                backgroundColor: '#A809DC',
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
            <ShareSocialMediaCom
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/@tvshambhusharanlataji9735/featured',
                )
              }
              type={'AntDesign'}
              name={'youtube'}
              iconContianerProps={{
                backgroundColor: '#D00000',
                padding: 10,
                width: iconWidthHeight,
                height: iconWidthHeight,
              }}
              size={iconSizeWidthHeight}
            />
          </View>
        </View>
      </ModalCom>
      {/* Modal Social Media End*/}
      {/* Modal Logout  Start*/}
      <ModalCom
        contianerStyle={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isLogout}
        onBackdropPress={() => setIsLogout(false)}>
        <View style={[styles.modalContainer, styles.modalLogoutContainer]}>
          <Text
            style={[
              styles.modalTitle02,
              {color: Colors.Black, textAlign: 'center', marginBottom: hp(5)},
            ]}>
            {t('WantToLogout')}
          </Text>
          {loading ? (
            <LoaderCom />
          ) : (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <ButtonCom
                label={t('Cancel')}
                propsContainer={{borderWidth: 1, backgroundColor: null}}
                propsLabel={{color: Colors.Black, fontSize: hp(2)}}
                onPress={() => setIsLogout(false)}
              />
              <ButtonCom label={t('YesLogout')} onPress={() => _logout()} />
            </View>
          )}
        </View>
      </ModalCom>
      {/* Modal Logout  End*/}

      {/* bottom part Langauage */}
      <View style={styles.mtContianer}>
        <SelectLangModal
          visible={showModal}
          selectedLang={selectLanguage}
          onClose={() => {
            setShowModal(false);
          }}
          onSelect={async lang => {
            let lng = handleLanguageChange(
              i18n.language === 'en' ? 'hi' : 'en',
            );
            setSelectLanguage(lang);
            setShowModal(false);
          }}
        />
      </View>
    </AppWapper>
  );
};
export default Profile;
const styles = StyleSheet.create({
  backgroundImgContianer: {
    width: '100%',
    height: hp(25),
  },
  imgTxtContainer: {
    justifyContent: 'center',
    flex: 0.8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  vactorIcon: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(25),
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vactorIconEdit: {
    position: 'relative',
    top: hp(4),
    left: wp(-6),
    padding: wp(1),
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    backgroundColor: Colors.White,
  },
  userName: {
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    color: Colors.White,
    textTransform: 'capitalize',
  },
  imgTxtContianer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMobile: {
    fontSize: hp(1.6),
    lineHeight: wp(4),
  },
  useContentContainer: {
    marginRight: wp(3),
  },
  profileBtnContianer: {
    paddingVertical: hp(2),
    marginBottom: hp(30),
  },
  footer: {
    backgroundColor: Colors.White,
    width: '100%',
    height: hp(4),
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: wp(1),
  },
  modalContainer: {
    backgroundColor: Colors.White,
    flex: 0.6,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    padding: wp(4),
  },
  modalLogoutContainer: {
    flex: 0.2,
  },
  modalTitle: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(3),
    textAlign: 'center',
    marginBottom: hp(2),
  },
  modalTitle02: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2.3),
    marginLeft: wp(2),
    marginTop: hp(0),
    marginBottom: hp(1),
  },
  modalPara: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    textTransform: 'capitalize',
    fontSize: hp(1.6),
    marginHorizontal: wp(2),
    marginBottom: hp(2),
  },
  socialMeadiaContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
});

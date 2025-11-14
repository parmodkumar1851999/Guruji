import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  View,
  Linking,
  Platform,
  Alert,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import InputCom from '../../Components/InputCom';
// import {Text} from '@react-navigation/elements';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import VectorIcon from '../../Constants/VectorIcon';
import ButtonCom from '../../Components/ButtonCom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreensName from '../../Navigations/ScreensName';
import {ToastCom} from '../../Components/ToastCom';
import {ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderCom from '../../Components/LoaderCom';
import ModalCom from '../../Components/ModalCom';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native'
import Toast from 'react-native-toast-message';


const RegisterDetails = ({navigation}) => {


  const [show, setShow] = useState(false);
  const [FullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState(false);
  const [isTermsCondi, setIsTermsCondi] = useState(false);
  const [ip, setIP] = useState(null);
  const [sendFcmTokenToBackend, setSendFcmTokenToBackend] = useState(null);

  // Get ip Addrss  START
  useEffect(() => {
    const getLocalIP = async () => {
      const ip = await DeviceInfo.getIpAddress();
      // console.log('Device Local IP Address is pppp:', ip);
      setIP(ip);
    };
    getLocalIP();
  }, []);
  // Get ip Addrss  END



useEffect(()=>{
  requestUserPermission()
})
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
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
        { cancelable: false },
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
      console.log('App opened from a notification:', remoteMessage);
    }
  };
  useEffect(() => {
    const requestUserPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
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
    const foregroundUnsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Received foreground notification:', remoteMessage);
        Toast.show({
          type: 'success',
          text1: `${remoteMessage.notification.title}`,
          text2: `${remoteMessage.notification.body}`
        });
      // Display Notification using Notifee
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          // channelId: ImagePath.CardImg01,
          channelId: channelId,
          smallIcon: ImagePath.EBookDownloadImg,
        },
      });
      // Display Toast on Android
      if (Platform.OS === 'android') {
        Toast.show({
          type: 'success',
          text1: `${remoteMessage.notification.title}`,
          text2: `${remoteMessage.notification.body}`
        });
      }
    });
    const backgroundUnsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage);
    });
    return () => {
      foregroundUnsubscribe();
      backgroundUnsubscribe();
    };
  }, []);
    // new code for push Notifaction END %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 



  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // ************ APi work Start************
  const _registerApi = async () => {
    if (validateEmail(email)) {
      const dateOfBirth = extractDate(date.toISOString());
      setLoading(true);
      const fd = new FormData();
      fd.append('fullName', FullName);
      fd.append('mobile', mobileNo);
      fd.append('email', email);
      fd.append('password', password);
      fd.append('dob', dateOfBirth);
      fd.append('deviceId', ip);
      fd.append('fcmToken', sendFcmTokenToBackend);
      // ********* This field in not there in register ui part. but backend is passing {uploadimg} key  this is not mandatory we will use in feture. *********
      // fd.append("uploadedFile", {
      //   uri: rc?.uri,
      //   name: rc?.name,
      //   type: rc?.type,
      // });
      let token = await AsyncStorage.getItem('token').catch(err =>
        console.log(err),
      );
      try {
        setLoading(true);
        const response = await fetch(ApiUrl.registerApi, {
          method: 'POST',
          body: fd,
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            token: token,
          },
        });
        const result = await response.json();
        // console.log('register success.CMMMMD..', result);
        if (result?.success == true) {
          navigation.navigate(ScreensName.OTP, {
            userRegisterEmail: email,
            userRegisterMobileNo: mobileNo,
          });
          // navigation.navigate(ScreensName.OTP, {userRegisterEmail: email});
        }
        ToastCom({type: 'Success', text2: result?.message});
        setLoading(false);
      } catch (error) {
        console.error(error);
        ToastCom({type: 'error', text2: result?.message});
      }
    } else {
      ToastCom({type: 'error', text2: 'Please Enter Valid Email Address'});
    }
  };
  // ************ APi work End************


  // date Of birth formate Start
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 0);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const extractDate = isoString => {
    if (isoString) {
      const [year, month, day] = isoString.split('T')[0].split('-');
      return `${day}-${month}-${year}`;
    } else {
      console.error('Date Of Birth Not Selected');
      return null;
    }
  };
  //   if (date) {
  //     console.log('Ui Show Date Of Birth  : ', format(date, 'dd-MM-yyyy'));
  //     console.log('Send backend Date Of Birth : ', date);
  //   } else {
  //     console.error('Date Of Birth Not Selected ');
  //   }
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('CreateAccount')}
      />
      <KeyboardAwareScrollView
        extraHeight={200}
        style={{height: '100%'}}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          // style={styles.contentContianer}>

          style={styles.contianer}>
          <View>
            <Text style={[styles.mobileTxt, {marginTop: hp(3)}]}>
              {t('FullName')}
            </Text>
            <InputCom
              placeholder={t('EnterFullName')}
              keyboardType={'email-address'}
              value={FullName}
              onChangeText={txt => setFullName(txt)}
            />
            <Text style={styles.mobileTxt}>{t('MobileNumber')}</Text>
            <InputCom
              placeholder={t('MobilePlaceholder')}
              keyboardType={'number-pad'}
              secureTextEntry={false}
              maxLength={10}
              value={mobileNo}
              onChangeText={txt => setMobileNo(txt)}
            />
            <Text style={styles.mobileTxt}>{t('Email')}</Text>
            <InputCom
              placeholder={t('ExamEmail')}
              keyboardType={'email-address'}
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
            <Text style={styles.mobileTxt}>{t('Password')}</Text>
            <InputCom
              placeholder={'*************'}
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
              showHide
            />
            <Text style={styles.mobileTxt}>{t('DateOfBirth')}</Text>
            <View
              style={[
                styles.passwordContiaer,
                {
                  borderColor: !date ? Colors.ExtraLightGray : Colors.Primary,
                  alignItems: 'center',
                },
              ]}>
              {/* DateTimePicker Start   */}
              {show && (
                <DateTimePicker
                  // minimumDate={new Date()}
                  maximumDate={eighteenYearsAgo}
                  testID="dateTimePicker"
                  value={date || eighteenYearsAgo}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShow(true)}
                style={styles.btnDateOfBirth}>
                {date ? (
                  <Text
                    style={[
                      styles.btnDateOfBirthTxt,
                      {color: date ? Colors.Primary : Colors.Gray},
                    ]}>
                    {/* {format(date, 'dd-MM-yyyy')} */}
                    {extractDate(date.toISOString())}
                  </Text>
                ) : (
                  <Text style={{color: Colors.Gray}}>{'DD / MM /YYY'}</Text>
                )}
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setShow(true)}>
                  {date ? (
                    <VectorIcon
                      type={'MaterialCommunityIcons'}
                      name={'calendar'}
                      size={22}
                      color={Colors.Primary}
                    />
                  ) : (
                    <VectorIcon
                      type={'MaterialCommunityIcons'}
                      name={'calendar'}
                      size={22}
                      color={Colors.Gray}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {/* DateTimePicker End   */}
            </View>
          </View>
          {/* LoginWithGmail */}
          <View style={{}}>
            <Text
              onPress={() => navigation.navigate(ScreensName.LOGINEMAIL)}
              style={[styles.forgotBtn, {marginTop: hp(1)}]}>
              {t('LoginWithGmail')}
            </Text>
            <Text
              onPress={() => navigation.navigate(ScreensName.LOGIN)}
              style={styles.forgotBtn}>
              {t('LoginWithMobileNo')}
            </Text>
          </View>
          <Text style={[styles.tremCondication, {marginTop: hp(4)}]}>
            {t('ByContinuing')}{' '}
          </Text>
          <Text style={styles.tremCondication}>
            <Text
              onPress={() => setIsTermsCondi(true)}
              style={styles.tremCondicationClick}>
              {t('TermsOfUse')}
            </Text>{' '}
            {t('and')}{' '}
            <Text
              onPress={() => setIsPrivacyPolicy(true)}
              style={styles.tremCondicationClick}>
              {t('PrivacyPolicy')}
            </Text>{' '}
          </Text>

          {loading ? (
            <LoaderCom />
          ) : (
            <View style={{alignSelf: 'center', marginVertical: hp(4)}}>
              <ButtonCom
                label={t('SignUp')}
                disabled={
                  FullName && mobileNo.length > 9 && email && password && date
                    ? false
                    : true
                }
                propsContainer={{
                  backgroundColor:
                    FullName && mobileNo.length > 9 && email && password && date
                      ? Colors.Primary
                      : Colors.Gray,
                }}
                // onPress={() => navigation.navigate(ScreensName.OTP)}
                onPress={() => _registerApi()}
              />
            </View>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {/* Modal Policy   Start*/}
      <ModalCom
        contianerStyle={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isPrivacyPolicy}
        onBackdropPress={() => setIsPrivacyPolicy(false)}>
        <View style={styles.modalContainer}>
          <Text
            style={[
              styles.policyTitle,
              {textAlign: 'center', marginVertical: hp(1)},
            ]}>
            {t('PrivacyPolicy')}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contianer}>
            <Text style={styles.policyTitle}>{t('PrivacyPolicy')}</Text>
            <Text style={[styles.policyPara, {fontWeight: '700'}]}>
              {t('LastUpdatedPolicTerm')}
            </Text>
            <Text style={[styles.policyPara, {marginBottom: hp(2)}]}>
              {t('WelcomeTo')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('GurujiAppisdesigned')}
            </Text>
            <Text style={styles.policyTitle}>{t('InformationWeCollect')}</Text>
            <Text style={styles.policyPara}>{t('WeCollectTheFollowing')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              <Text style={[styles.policyPara, styles.countNo]}>1.</Text>
              {t('PersonalInformation')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              <Text style={[styles.policyPara, styles.countNo]}>2.</Text>
              {t('NonPersonal')}
            </Text>
            <Text style={styles.policyTitle}>
              {t('HowWeUseYourInformation')}
            </Text>
            <Text style={styles.policyPara}>
              {t('TheCollectedInformation')}
            </Text>

            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('Providing')}
            </Text>

            <Text style={styles.policyTitle}>{t('DataSharingDisclosure')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('WedoNotSell')}
            </Text>

            <Text style={styles.policyTitle}>{t('SecurityMeasures')}</Text>
            <Text style={styles.policyPara}>{t('WeTakeStrongMeasures')}</Text>
            <Text style={styles.policyTitle}>{t('UserRightsControls')}</Text>
            <Text style={styles.policyPara}>
              {t('UsersCanAccess')}{' '}
              <Text
                onPress={() => {
                  Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                    console.error('Failed to open email client', err),
                  );
                }}
                style={[
                  styles.policyPara,
                  {color: 'blue', textDecorationLine: 'underline'},
                ]}>
                kathasaartv@gmail.com
              </Text>{' '}
            </Text>
            <Text style={styles.policyTitle}>{t('ThirdPartyServices')}</Text>
            <Text style={styles.policyPara}>{t('VideosAreCollection')}</Text>
            <Text style={styles.policyTitle}>{t('ChildrenPrivacy')}</Text>
            <Text style={styles.policyPara}>{t('GurujiAppIsNot')}</Text>
            <Text style={styles.policyTitle}>
              {t('ChangesToPrivacyPolicy')}
            </Text>
            <Text style={styles.policyPara}>{t('WeMayUpdateThisPolicy')}</Text>

            <Text style={styles.policyTitle}>{t('ContactInformation')}</Text>
            <Text style={styles.policyPara}>
              {t('IfYouhaveAnyQuestions')}{' '}
              <Text
                onPress={() => {
                  Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                    console.error('Failed to open email client', err),
                  );
                }}
                style={[
                  styles.policyPara,
                  {color: 'blue', textDecorationLine: 'underline'},
                ]}>
                kathasaartv@gmail.com
              </Text>
            </Text>
            <Text style={styles.footer} />
          </ScrollView>
        </View>
      </ModalCom>
      {/* Modal Trem Condi   Start*/}
      <ModalCom
        contianerStyle={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isTermsCondi}
        onBackdropPress={() => setIsTermsCondi(false)}>
        <View style={styles.modalContainer}>
          <Text
            style={[
              styles.policyTitle,
              {textAlign: 'center', marginVertical: hp(1)},
            ]}>
            {t('TermsAndConditions')}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contianer}>
            <Text style={styles.policyTitle}>{t('TermsAndConditions')}</Text>
            <Text style={[styles.policyPara, {fontWeight: '700'}]}>
              {t('LastUpdatedPolicTerm')}
            </Text>
            <Text style={styles.policyPara}>
              {t('WelcomeConditionsIsImportant')}{' '}
            </Text>
            <Text style={styles.policyTitle}>{t('AcceptanceofTerms')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('ByDownloadingInstalling')}
            </Text>
            <Text style={styles.policyTitle}>{t('PurposeApp')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('GurujiProvideVideos')}
            </Text>

            <Text style={styles.policyTitle}>
              {t('UserRegistrationResponsibilities')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('UsersMayRequired')}
            </Text>

            <Text style={styles.policyTitle}>{t('PrivacyPolicy')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('YourUseOf')}
            </Text>

            <Text style={styles.policyTitle}>
              {t('IntellectualPropertyRights')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('AllContent')}
            </Text>

            <Text style={styles.policyTitle}>{t('ProhibitedActivities')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('UsersMustNot')}
            </Text>

            <Text style={styles.policyTitle}>
              {t('ContentThirdPartyLinks')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('TheAppContainLinks')}
            </Text>

            <Text style={styles.policyTitle}>{t('NotificationsUpdates')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('ByUsingYouConsent')}
            </Text>

            <Text style={styles.policyTitle}>{t('LimitationOfLiability')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('WeStriveToProvide')}
            </Text>

            <Text style={styles.policyTitle}>{t('TerminationofAccess')}</Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('WeReserveTheRight')}
            </Text>

            <Text style={styles.policyTitle}>
              {t('ChangesToTermsConditions')}
            </Text>
            <Text style={[styles.policyTitle, styles.policyPara]}>
              {t('WeMayUpdate')}
            </Text>

            <Text style={styles.policyTitle}>{t('ContactInformation')}</Text>
            <Text style={styles.policyPara}>
              {t('ForAnyQuestions')}:{' '}
              <Text
                onPress={() => {
                  Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                    console.error('Failed to open email client', err),
                  );
                }}
                style={[
                  styles.policyPara,
                  {color: 'blue', textDecorationLine: 'underline'},
                ]}>
                kathasaartv@gmail.com
              </Text>
            </Text>
            <Text style={styles.footer} />
          </ScrollView>
        </View>
      </ModalCom>
      {/* Modal Logout  End*/}
    </AppWapper>
  );
};

export default RegisterDetails;

const styles = StyleSheet.create({
  contianer: {marginHorizontal: wp(4)},

  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: wp(1),
  },
  btnDateOfBirth: {
    backgroundColor: Colors.lightSkyblue,
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp(2),
    justifyContent: 'space-between',
    padding: wp(3),
  },
  btnDateOfBirthTxt: {
    fontSize: hp(1.9),
    fontFamily: Fonts.PoppinsMedium500,
  },
  tremCondication: {
    color: Colors.Black,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.8),
    lineHeight: hp(2.5),
    textAlign: 'center',
  },
  tremCondicationClick: {
    color: Colors.Primary,
    textDecorationLine: 'underline',
    fontFamily: Fonts.InterBold700,
  },
  modalContainer: {
    backgroundColor: Colors.White,
    flex: 0.7,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    padding: wp(4),
  },
  contianer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(10),
  },
  policyTitle: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.6),
    marginVertical: hp(2),
    textTransform: 'capitalize',
  },
  policyPara: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.6),
    marginVertical: hp(0),
    textAlign: 'justify',
  },
  countNo: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
  },
  footer: {
    backgroundColor: Colors.White,
    width: '100%',
    height: hp(10),
  },
  forgotBtn: {
    textAlign: 'right',
    fontFamily: Fonts.InterBold700,
    color: Colors.Primary,
    fontSize: hp(1.8),
    textDecorationLine: 'underline',
  },
});

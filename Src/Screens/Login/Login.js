import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  View,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import InputCom from '../../Components/InputCom';
import ButtonCom from '../../Components/ButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import SelectLangModal from '../../Components/SelectLangModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {ToastCom} from '../../Components/ToastCom';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoaderCom from '../../Components/LoaderCom';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../redux/Slice/LoginSlice';
import {setIsLocal} from '../../redux/Slice/LocalSlice';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectLanguage, setSelectLanguage] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendFcmTokenToBackend, setSendFcmTokenToBackend] = useState('');
  // for other code
  // -----------------------inside can unlock--------------

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setSendFcmTokenToBackend(fcmToken);
    } else {
      console.log('No FCM token available');
    }
  };
  useEffect(() => {
    getFcmToken();
  }, []);

  // ************ APi work Start************
  const _MobileNoApi = async () => {
    if (mobile.length > 9 && sendFcmTokenToBackend) {
      let config = {
        url: `${ApiUrl.loginMobileApi}`,
        method: 'post',
        body: {
          mobile: mobile,
          password: password,
          newFcmToken: sendFcmTokenToBackend,
        },
      };
      setLoading(true);
      await APIRequest(
        config,
        res => {
          AsyncStorage.setItem('token', res?.token).catch(err =>
            console.log(err),
          );
          // console.log(' login ....Success.',res)
          // console.log(' login ....res?.token.',res?.token)
          if (res?.success == true) {
            navigation.navigate(ScreensName.BOTTOMNAVIGATION);
          }
          ToastCom({type: 'success', text2: res?.message});
          dispatch(setLogin(true));
          setLoading(false);
        },
        err => {
          console.log(err?.message, '---err');
          setLoading(false);
          if (err?.message) {
            ToastCom({type: 'error', text2: err?.message});
          }
        },
      );
    } else {
      ToastCom({type: 'error', text2: 'Please Enter 10 digit mobile No'});
    }
  };
  // ************ APi work End************

  // ************ luanguage Btn work start ************
  useEffect(() => {
    checkLng();
  }, []);
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
  // ************ luanguage Btn work End ************

  // ************ Local Login work start ************
  const onLoginLocal = async () => {
    dispatch(setIsLocal(true));
    try {
      await AsyncStorage.setItem('isLocal', 'true');
    } catch (error) {
      console.error('Failed to save data to AsyncStorage:', error);
    }
  };
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      onLoginLocal();
      setLoading(false);
    }, 2000);
  };
  // ************ Local Login work End ************
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => alert(t('CantGoBack'))}
        labelCenter={t('Login')}
      />
      <KeyboardAwareScrollView
        extraHeight={150}
        style={{height: '100%'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerFlexContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={Keyboard.dismiss}
            style={styles.contentContianer}>
            <Text style={styles.welcomeTxt}>{t('Welcome')}</Text>
            <Text style={styles.paraTxt}>{t('LoginPara')}</Text>
            <Text style={styles.mobileTxt}>{t('MobileNumber')}</Text>
            <InputCom
              placeholder={t('MobilePlaceholder')}
              keyboardType={'number-pad'}
              secureTextEntry={false}
              maxLength={10}
              value={mobile}
              onChangeText={txt => setMobile(txt)}
            />
            <Text style={[styles.mobileTxt, {marginTop: hp(1)}]}>
              {t('Password')}
            </Text>
            <InputCom
              placeholder={'*************'}
              onChangeText={txt => setPassword(txt)}
              secureTextEntry={true}
              value={password}
              showHide
            />

            {/* LoginWithGmail */}
            <View style={{}}>
              {/* CreateAccount */}
              <Text
                onPress={() => navigation.navigate(ScreensName.REGISTERDETAILS)}
                style={[styles.forgotBtn, {marginTop: hp(1)}]}>
                {t('CreateAccount')}
              </Text>
              <Text
                onPress={() => navigation.navigate(ScreensName.FORGETPASSWORD)}
                style={styles.forgotBtn}>
                {t('ForgotPassword')}
              </Text>
              <Text
                onPress={() => navigation.navigate(ScreensName.LOGINEMAIL)}
                style={styles.forgotBtn}>
                {t('LoginWithGmail')}
              </Text>
            </View>
            {loading ? (
              <LoaderCom />
            ) : (
              <View style={styles.btnContainer}>
                <ButtonCom
                  label={t('LoginWithMobile')}
                  disabled={mobile.length > 9 && password ? false : true}
                  propsContainer={{
                    width: '80%',
                    backgroundColor:
                      mobile.length > 9 && password
                        ? Colors.Primary
                        : Colors.Gray,
                  }}
                  onPress={() => _MobileNoApi()}
                />
              </View>
            )}
            {!loading && (
              <ButtonCom
                onPress={() => simulateLoading()}
                label={t('GoWithoutLogin')}
                propsContainer={{
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: hp(1),
                }}
              />
            )}
          </TouchableOpacity>
          {/* bottom part Langauage */}
          <View style={styles.mtContianer}>
            <TouchableOpacity
              style={styles.luanguageBtn}
              onPress={() => {
                setShowModal(true);
              }}>
              <Text style={styles.chosseLung}>{t('ChosseLangauage')}</Text>
            </TouchableOpacity>
            <SelectLangModal
              visible={showModal}
              selectedLang={selectLanguage}
              onClose={() => {
                setShowModal(false);
              }}
              onSelect={async lang => {
                let lng =
                  //   lang == 'English'
                  //     ? 'en'
                  //     : lang == 'हिंदी'
                  //     ? 'hi':
                  // await AsyncStorage.setItem('LANG', lng);

                  // // _parmod()
                  // i18n.changeLanguage(lng);
                  handleLanguageChange(i18n.language === 'en' ? 'hi' : 'en');

                setSelectLanguage(lang);
                setShowModal(false);
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppWapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  innerFlexContainer: {
    justifyContent: 'space-between',
    height: '92%',
    paddingHorizontal: wp(4),
  },
  contentContianer: {
    flex: 0.6,
  },
  welcomeTxt: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    marginTop: hp(4),
  },
  paraTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsRegular400,
    fontSize: hp(1.5),
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2.3),
    marginTop: hp(4),
    marginBottom: hp(0.3),
    marginLeft: wp(1),
  },
  btnContainer: {alignSelf: 'center', marginTop: hp(9)},
  mtContianer: {
    flex: 0.4,
    paddingBottom: hp(4),
    marginBottom: hp(2),
    marginRight: wp(4),
    marginTop: hp(11),
    marginBottom: hp(5),
  },
  modalContainer: {margin: 0, justifyContent: 'flex-end'},
  modalInnerContianer: {
    backgroundColor: Colors.White,
    height: hp(30),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    padding: wp(5),
  },
  luanguageBtn: {
    borderWidth: 1,
    borderColor: Colors.Primary,
    padding: wp(1),
    alignSelf: 'flex-end',
    width: '35%',
    borderRadius: wp(2),
  },
  chosseLung: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: hp(2.3),
    paddingVertical: hp(0.5),
  },
  luanguageTitle: {
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2.4),
    textAlign: 'center',
    color: Colors.Primary,
  },
  forgotBtn: {
    textAlign: 'right',
    fontFamily: Fonts.InterBold700,
    color: Colors.Primary,
    fontSize: hp(1.8),
    textDecorationLine: 'underline',
  },
});

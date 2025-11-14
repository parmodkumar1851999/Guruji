import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import ButtonCom from '../../Components/ButtonCom';
import {saveUserData} from '../../Redux/Reducers/auth';
import {OtpInput} from 'react-native-otp-entry';
import {t} from 'i18next';
import LoaderCom from '../../Components/LoaderCom';
import {ToastCom} from '../../Components/ToastCom';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreensName from '../../Navigations/ScreensName';
const Otp = ({navigation, route}) => {
  const {userRegisterEmail, userRegisterMobileNo} = route.params;
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');


  // ************ APi work Start************
  const _otpVerify = async () => {
      setLoading(true);
        let config = {
          url: `${ApiUrl.otpVerifyApi}`,
          method: "post",
          body: {
            email: userRegisterEmail,
            otp: otp,
          },
        };
       await APIRequest(
          config,
          (res) => {
            console.log(' Otp ....Success.',res)
            if (res?.success == true) {
                  navigation.navigate(ScreensName.CONGRATULATIONS);
                }
            ToastCom({ type: "success", text2: res?.message });
            setLoading(false);
          },
          (err) => {
            console.log(err?.message, "---err");
            setLoading(false);
            if (err?.message) {
              ToastCom({ type: "error", text2: err?.message });
            }
          }
        );
      }

 const _resentOtp = async () => {
        setLoading(true);
          let config = {
            url: `${ApiUrl.resendApi}`,
            method: "post",
            body: {
              email: userRegisterEmail},
          };
         await APIRequest(
            config,
            (res) => {
              console.log('Resent Otp success.',res)
              ToastCom({ type: "success", text2: 'Resent Otp successfully send.' });
              setLoading(false);
            },
            (err) => {
              console.log(err?.message, "---err");
              setLoading(false);
              if (err?.message) {
                ToastCom({ type: "error", text2: err?.message });
              }
            }
          );
        }
  // ************ APi work End ************



  // const simulateLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     onLogin();
  //     setLoading(false);
  //   }, 2000);
  // };
  useEffect(() => {
    const _timeOut = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (_timeOut) {
        clearTimeout(_timeOut);
      }
    };
  }, [timer]);
  const _onResendCode = () => {
    setTimer(59);
    _resentOtp()
  };
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('Login')}
      />
      <View style={styles.innerFlexContainer}>
        <View style={styles.contentContianer}>
          <Text style={styles.welcomeTxt}>{t('Welcome')}</Text>
          <Text style={styles.paraTxt}>
            {t('OtpPara')}
            {'. '}
            <Text style={{fontSize: hp(2), color: Colors.Primary}}>
              {/* {paramsEmail?paramsEmail:`${t('ifGmailNotThere')}`||paramsMobileNo?paramsMobileNo:`${t('ifMobileNotThere')}`} */}
              {userRegisterEmail
                ? userRegisterEmail
                : `${t('ifGmailNotThere')}`}
            </Text>
            {'\n'}
            <Text style={{fontSize: hp(2), color: Colors.Primary}}>
              {userRegisterMobileNo
                ? userRegisterMobileNo
                : `${t('ifMobileNotThere')}`}
            </Text>
          </Text>
          <Text style={styles.mobileTxt}>{t('EnterOtp')}</Text>
          <OtpInput
            numberOfDigits={5}
            onTextChange={txt => setOtp(txt)}
            code={otp}
            focusColor={Colors.Primary}
            focusStickBlinkingDuration={300}
            disabled={false}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: Colors.lightSkyblue,
                width: wp(14),
                height: hp(7),
                borderRadius: wp(3),
              },
            }}
          />
          <Text style={styles.recevedCode}>
            {t('DontReceive')}
            {timer > 0 ? (
              <Text style={[styles.resendCode, {color: Colors.Gray}]}>
                {t('Resend')} :
              </Text>
            ) : (
              <Text style={styles.resendCode} onPress={() => _onResendCode()}>
                {t('Resend')} :
              </Text>
            )}
            <Text style={{fontFamily: Fonts.InterBold700}}> {timer}</Text>
          </Text>

          {loading ? (
            <LoaderCom />
          ) : (
            <View style={styles.btnContainer}>
              <ButtonCom
                label={t('Submit')}
                disabled={otp.length > 3 ? false : true}
                propsContainer={{
                  backgroundColor:
                    otp.length > 3 ? Colors.Primary : Colors.Gray,
                }}
                // onPress={() => simulateLoading()}
                onPress={() => _otpVerify()}
              />
            </View>
          )}
        </View>
        <View style={styles.mtContianer} />
      </View>
    </AppWapper>
  );
};

export default Otp;
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
    fontSize: hp(2.4),
    marginTop: hp(8),
    marginBottom: hp(0.5),
    marginLeft: wp(1),
  },
  btnContainer: {alignSelf: 'center', marginTop: hp(6)},
  mtContianer: {
    flex: 0.4,
  },
  recevedCode: {
    color: Colors.Black,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.8),
    textAlign: 'center',
    marginTop: hp(4),
  },
  resendCode: {
    color: Colors.Primary,
    textDecorationLine: 'underline',
    fontFamily: Fonts.InterBold700,
  },
});

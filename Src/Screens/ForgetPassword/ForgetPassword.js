import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import InputCom from '../../Components/InputCom';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import ButtonCom from '../../Components/ButtonCom';
import ModalCom from '../../Components/ModalCom';
import {OtpInput} from 'react-native-otp-entry';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import {ToastCom} from '../../Components/ToastCom';
import ScreensName from '../../Navigations/ScreensName';
import LoaderCom from '../../Components/LoaderCom';
const ForgetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // ************ APi work Start************
  const _forgetPassword = async () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.forgotApi}`,
      method: 'post',
      body: {
        email: email,
      },
    };
    await APIRequest(
      config,
      res => {
        if (res?.success == true) {
          setIsVisible(true);
        }
        ToastCom({type: 'success', text2: res?.message});
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
  };
  const _resetPassword = async () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.resetApi}`,
      method: 'post',
      body: {
        email: email,
        otp: otp,
        password: password,
      },
    };
    await APIRequest(
      config,
      res => {
        console.log('Password  successfully ......', res);
        if (res?.success == true) {
          // setIsVisible(false);
          navigation.navigate(ScreensName.LOGINEMAIL);
        }
        ToastCom({type: 'success', text2: res?.message});
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
  };
  const _resentOtp = async () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.resendApi}`,
      method: 'post',
      body: {
        email: email,
      },
    };
    await APIRequest(
      config,
      res => {
        console.log('Resent Otp success.', res);
        ToastCom({type: 'success', text2: 'Resent Otp successfully send.'});
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
  };
  // ************ APi work Start************
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
    _resentOtp();
    // _forgetPassword()
  };
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('ForgotPassword')}
      />
      <View style={styles.contianer}>
        <Text style={styles.forgetTxt}>{t('NewPasswordPara')}</Text>
        <Text style={styles.mobileTxt}>{t('RegisterEmail')}</Text>
        <InputCom
          placeholder={t('ExamEmail')}
          keyboardType={'email-address'}
          onChangeText={txt => setEmail(txt)}
          value={email}
        />
        {loading ? (
          <LoaderCom />
        ) : (
          <View style={{alignSelf: 'center', marginVertical: hp(2)}}>
            <ButtonCom
              onPress={() => _forgetPassword()}
              label={t('SendOtp')}
              disabled={email ? false : true}
              propsContainer={{
                backgroundColor: email ? Colors.Primary : Colors.Gray,
              }}
            />
          </View>
        )}
        <ModalCom
          contianerStyle={{justifyContent: 'flex-end', margin: 0}}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <View
            style={{
              backgroundColor: Colors.White,
              flex: 0.5,
              borderTopLeftRadius: wp(2),
              borderTopRightRadius: wp(2),
              padding: wp(4),
            }}>
            <Text style={styles.enterOtp}>{t('EnterOtp')}</Text>
            <KeyboardAwareScrollView
              extraHeight={200}
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}>
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
                {/* {t('DontReceive')} */}
                {timer > 0 ? (
                  <Text style={[styles.resendCode, {color: Colors.Gray}]}>
                    {t('Resend')} :
                  </Text>
                ) : (
                  <Text
                    style={styles.resendCode}
                    onPress={() => _onResendCode()}>
                    {t('Resend')} :
                  </Text>
                )}
                <Text style={{fontFamily: Fonts.InterBold700}}> {timer}</Text>
              </Text>
              <Text style={styles.mobileTxt}>{t('NewPassword')}</Text>
              <InputCom
                placeholder={'*************'}
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
                showHide
              />
              {/* <Text style={[styles.mobileTxt, {marginTop: hp(3)}]}>
                {t('ConfirmPassword')}
              </Text>
              <InputCom
                placeholder={'*************'}
                onChangeText={setConPassword}
                secureTextEntry={true}
                value={conPassword}
                showHide
              /> */}
              {loading ? (
                <LoaderCom />
              ) : (
                <View style={{alignSelf: 'center', marginVertical: hp(3)}}>
                  <ButtonCom
                    onPress={() => _resetPassword()}
                    label={t('ResetPassword')}
                    disabled={otp.length > 4 && password ? false : true}
                    propsContainer={{
                      width: '55%',
                      backgroundColor:
                        otp.length > 4 && password
                          ? Colors.Primary
                          : Colors.Gray,
                    }}
                  />
                </View>
              )}
            </KeyboardAwareScrollView>
          </View>
        </ModalCom>
      </View>
    </AppWapper>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  contianer: {paddingHorizontal: wp(4)},
  forgetTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.5),
    textTransform: 'capitalize',
    marginTop: hp(3),
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(4),
    marginLeft: wp(1),
  },
  enterOtp: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(3),
    textAlign: 'center',
    marginBottom: hp(2),
  },
  recevedCode: {
    color: Colors.Black,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.8),
    marginRight: wp(1),
    marginTop: hp(0.5),
  },
  resendCode: {
    color: Colors.Primary,
    textDecorationLine: 'underline',
    fontFamily: Fonts.InterBold700,
    textAlign: 'right',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import InputCom from '../../Components/InputCom';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import LoaderCom from '../../Components/LoaderCom';
import ButtonCom from '../../Components/ButtonCom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreensName from '../../Navigations/ScreensName';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import {ToastCom} from '../../Components/ToastCom';

const PasswordChange = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const _changePassword = async () => {
    setLoading(true);
    let config = {
      url: `${ApiUrl.changePasswordApi}`,
      method: 'post',
      body: {
        oldPassword: currentPassword,
        password: newPassword,
      },
    };
    await APIRequest(
      config,
      res => {
        if (res?.success == true) {
          navigation.goBack();
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
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('PasswordChange')}
      />
      <KeyboardAwareScrollView
        extraHeight={400}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contianer}>
          <Text style={styles.mobileTxt}>{t('CurrentPassword')}</Text>
          <InputCom
            placeholder={'*************'}
            onChangeText={setCurrentPassword}
            secureTextEntry={true}
            value={currentPassword}
            showHide
          />
          <Text
            onPress={() =>
              navigation.navigate(ScreensName.FORGETPASSWORDMAINSTACK)
            }
            style={styles.forgotBtn}>
            {t('ForgotPassword')}
          </Text>
          <Text style={styles.mobileTxt}>{t('NewPassword')}</Text>
          <InputCom
            placeholder={'*************'}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            value={newPassword}
            showHide
          />
          <Text style={styles.mobileTxt}>{t('ConfirmNewPassword')}</Text>
          <InputCom
            placeholder={'*************'}
            onChangeText={setConformPassword}
            secureTextEntry={true}
            value={conformPassword}
            showHide
          />
          {loading ? (
            <LoaderCom />
          ) : (
            <View
              style={{
                alignSelf: 'center',
                marginVertical: hp(4),
                marginBottom: hp(8),
              }}>
              <ButtonCom
                label={t('PasswordChange')}
                disabled={
                  currentPassword &&
                  newPassword == conformPassword &&
                  conformPassword
                    ? false
                    : true
                }
                propsContainer={{
                  width: '60%',
                  backgroundColor:
                    currentPassword &&
                    newPassword == conformPassword &&
                    conformPassword
                      ? Colors.Primary
                      : Colors.Gray,
                }}
                // onPress={() => navigation.navigate(ScreensName.OTP)}
                onPress={() => _changePassword()}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </AppWapper>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  contianer: {
    padding: wp(4),
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: wp(1),
  },
  forgotBtn: {
    textAlign: 'right',
    fontFamily: Fonts.InterBold700,
    color: Colors.Primary,
    marginBottom: hp(0.5),
    fontSize: hp(1.8),
    textDecorationLine: 'underline',
  },
});

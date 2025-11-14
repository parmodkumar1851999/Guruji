import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';
import StatusBarCom from '../../Components/StatusBarCom';
import AppWapper from '../../Components/AppWapper';
import ImagePath from '../../Constants/ImagePath';
import {hp, wp} from '../../Constants/Responsive';
import FastImage from 'react-native-fast-image';
import ScreensName from '../../Navigations/ScreensName';
import Fonts from '../../Constants/Fonts';
import {t} from 'i18next';
const InitialScreen = ({navigation}) => {
  // setTimeout(() => {
  //   navigation.navigate(ScreensName.ONBOARDINGONE);
  // }, 2000);
  return (
    <AppWapper containerProps={styles.containerProps}>
      <StatusBarCom
        backgroundColor={Colors.Primary}
        barStyle={'light-content'}
      />
      <View style={styles.imgContianer}>
        <FastImage source={ImagePath.GurujiImg} style={styles.gurujiImg} />
        <Text style={styles.nameGuruji}>{t('Guruji')}</Text>
      </View>
    </AppWapper>
  );
};
export default InitialScreen;
const styles = StyleSheet.create({
  containerProps: {
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContianer: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
  },
  gurujiImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameGuruji: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(4),
    textAlign: 'center',
  },
});

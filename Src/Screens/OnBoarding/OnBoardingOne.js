import {Text, View} from 'react-native';
import React from 'react';
import StatusBarCom from '../../Components/StatusBarCom';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import {hp, wp} from '../../Constants/Responsive';
import ButtonCom from '../../Components/ButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import styles from './styles';
import {t} from 'i18next';
import { useDispatch } from 'react-redux';
import { setIsLocal } from '../../redux/Slice/LocalSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingOne = ({navigation}) => {
    const dispatch = useDispatch();
  const _next = parmod => {
    if (parmod) {
      navigation.navigate(ScreensName.ONBOARDINGTWO);
    } else {
      navigation.navigate(ScreensName.LOGIN);
    }
  };

    const onLoginLocal = async () => {
    dispatch(setIsLocal(true));
    try {
      await AsyncStorage.setItem('isLocal', 'true');
    } catch (error) {
      console.error('Failed to save data to AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBarCom />
      <View style={styles.imgContianer}>
        <FastImage source={ImagePath.splashImg} style={styles.splashImg} />
      </View>
      <View style={styles.textContent}>
        <View style={styles.OnBoardingContainer}>
          <Text style={styles.OnBoardingTitleOne}>
            {t('OnBoardingTitleOne')}
          </Text>
          <Text style={styles.OnBoardingParaOne}>{t('OnBoardingParaOne')}</Text>
        </View>
        <View style={styles.dottedContianer}>
          <Text style={[styles.dotted, {backgroundColor: Colors.Primary}]} />
          <Text style={[styles.dotted, {marginHorizontal: wp(2)}]} />
          <Text style={styles.dotted} />
        </View>

        <View style={{alignSelf: 'center'}}>
          <ButtonCom label={t('Next')} onPress={() => _next('parmod')} />
          <ButtonCom propsContainer={styles.propsContainer} propsLabel={styles.propsLabel} label={t('Skip')} onPress={() => onLoginLocal()} />
        </View>
      </View>
    </View>
  );
};

export default OnBoardingOne;

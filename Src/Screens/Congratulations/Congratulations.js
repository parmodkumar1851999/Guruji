import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ImagePath from '../../Constants/ImagePath';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import ScreensName from '../../Navigations/ScreensName';

const Congratulations = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreensName.LOGINEMAIL);
    }, 2000);
  }, []);
  return (
    <View style={styles.contianer}>
      <Text style={{color: Colors.Black, fontSize: hp(3.5)}}>
        Congratulations
      </Text>
      <FastImage
        source={ImagePath.CongratulationsGif}
        style={{width: wp(100), height: hp(40), borderRadius: wp(50)}}
        resizeMode="contain"
      />
    </View>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

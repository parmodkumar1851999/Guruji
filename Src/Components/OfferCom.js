import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import ImagePath from '../Constants/ImagePath';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import ModalCom from './ModalCom';

const OfferCom = ({onBackdropPress, isVisible}) => {
  return (
    <ModalCom
      contianerStyle={{}}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <ImageBackground
        resizeMode="stretch"
        source={ImagePath.gurujiCard}
        style={styles.offerImg}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackdropPress}
          style={styles.closeImg}>
          <FastImage source={ImagePath.OfferCloseImg} style={styles.closeImg} />
        </TouchableOpacity>
        <Text style={styles.hurryOfferTitle}>{/* Hurry Offers! */}</Text>
        <Text style={styles.centerTitle}>{/* wfoeF Eofub */}</Text>
        <Text style={styles.bottomTitle}>
          {/* lorem lyupsem ewof ewfuEQ */}
        </Text>
        {/* <Text
          onPress={() =>
            Linking.openURL(
              'https://www.youtube.com/@tvshambhusharanlataji9735/featured',
            )
          }
          style={styles.btnGotIt}>
          Go to
        </Text> */}
      </ImageBackground>
    </ModalCom>
  );
};

export default OfferCom;

const styles = StyleSheet.create({
  offerImg: {
    width: wp(90),
    height: hp(70),
    // width: wp(80),
    // height: hp(45),
    padding: wp(4),
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeImg: {
    width: wp(9),
    height: wp(9),
    alignSelf: 'flex-end',
  },
  hurryOfferTitle: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(4),
    textAlign: 'center',
  },
  centerTitle: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    textAlign: 'center',
    marginVertical: hp(3),
  },
  bottomTitle: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(1.8),
    textAlign: 'center',
  },
  btnGotIt: {
    textAlign: 'center',
    padding: wp(2),
    width: '80%',
    alignSelf: 'center',
    marginVertical: hp(5),
    marginTop:hp(12),
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    borderRadius: wp(1),
    backgroundColor: Colors.White,
    color: Colors.Black,
    borderWidth: 1.2,
    fontSize:hp(1.8),
    borderColor: Colors.Gray,
  },
});

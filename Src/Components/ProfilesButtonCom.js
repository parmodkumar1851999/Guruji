import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import VectorIcon from '../Constants/VectorIcon';
import Colors from '../Constants/Colors';
import {hp, wp} from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';

const ProfilesButtonCom = ({name, type, onPress, labal,size}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.buttonContianer}>
      <View style={[styles.buttonContianer, styles.buttonInnerLeft]}>
        <VectorIcon
          type={type}
          name={name}
          color={Colors.White}
          size={size?size:25}
          style={styles.vactorIconButtonLeft}
        />
        <Text style={styles.buttonTitle}>{labal}</Text>
      </View>

      <VectorIcon
        type={'Feather'}
        name={'chevron-right'}
        color={Colors.Primary}
        size={35}
      />
    </TouchableOpacity>
  );
};

export default ProfilesButtonCom;

const styles = StyleSheet.create({
  buttonContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  buttonInnerLeft: {
    paddingHorizontal: wp(0),
    paddingVertical: hp(0),
  },
  buttonTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.5),
    textTransform: 'capitalize',
    marginLeft: wp(5),
  },
  vactorIconButtonLeft: {
    backgroundColor: Colors.Primary,
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: wp(2),
    borderRadius: wp(12),
  },
});

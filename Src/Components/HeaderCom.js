import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import { hp, wp } from '../Constants/Responsive';
import VectorIcon from '../Constants/VectorIcon';
import Fonts from '../Constants/Fonts';

const size = wp(8);
const activeOpacity = 0.8;
const HeaderCom = ({ onPress, type, name, color, labelCenter,propsContainer }) => {
  return (
    <View style={{...styles.container,...propsContainer}}>
      <TouchableOpacity
        style={styles.backIconContianer}
        activeOpacity={activeOpacity}
        onPress={onPress}>
        <VectorIcon
          type={type}
          name={name}
          color={color ? color : Colors.White}
          size={size}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{labelCenter}</Text>
      <Text style={styles.mtLabel} />
    </View>
  );
};

export default HeaderCom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    height: hp(8),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconContianer: {
    alignItems: 'flex-start',
    width: wp(9),
  },
  label: {
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    textTransform: 'capitalize',
  },
  mtLabel: {
    width: wp(9),
  },
});

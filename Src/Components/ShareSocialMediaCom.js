import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import VectorIcon from '../Constants/VectorIcon';
import Colors from '../Constants/Colors';
import {wp} from '../Constants/Responsive';

const ShareSocialMediaCom = ({onPress, type, name, iconContianerProps,size}) => {
  return (
    <TouchableOpacity
    activeOpacity={.8}
      onPress={onPress}
      style={{...styles.iconContianer, ...iconContianerProps}}>
      <VectorIcon type={type} name={name} size={size?size:28} color={Colors.White} />
    </TouchableOpacity>
  );
};

export default ShareSocialMediaCom;

const styles = StyleSheet.create({
  contianer: {
    flexDirection: 'row',
  },
  iconContianer: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
});

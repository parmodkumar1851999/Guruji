import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Constants/Colors';
import {hp, wp} from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';
import VectorIcon from '../Constants/VectorIcon';
const InputCom = ({
  placeholder,
  keyboardType,
  maxLength,
  showHide,
  value,
  onChangeText,
  secureTextEntry,
  editable,
  propsInput,
  propscontianer,
  numberOfLines,
  onPress
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{...styles.contianer,...propscontianer}}>
      <TextInput
        style={{...styles.input,...propsInput}}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : 'default'}
        maxLength={maxLength ? maxLength : undefined}
        placeholderTextColor={Colors.Gray}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        numberOfLines={numberOfLines?numberOfLines:null}
      />
      {showHide && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <VectorIcon
            type={'Ionicons'}
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={isPasswordVisible?Colors.Primary:Colors.Gray}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default InputCom;
const styles = StyleSheet.create({
  contianer: {
    backgroundColor: Colors.lightSkyblue,
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    margin: 0,
    width: '92%',
    height: '100%',
    color: Colors.Primary,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.9),

  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { wp } from '../Constants/Responsive'
import VectorIcon from '../Constants/VectorIcon'
import Colors from '../Constants/Colors'
import { useNavigation } from '@react-navigation/native'

const GoBackBtnCom = ({color}) => {
    const navigation=useNavigation()
  return (
    <TouchableOpacity
        style={styles.backIconContianer}
        activeOpacity={.8}
        onPress={()=>navigation.goBack()}>
        <VectorIcon
          type={'Ionicons'}
          name={'chevron-back'}
          color={color ? color : Colors.Primary}
          size={28}
        />
      </TouchableOpacity>
  )
}

export default GoBackBtnCom

const styles = StyleSheet.create({
    backIconContianer: {
        alignItems: 'flex-start',
        width: wp(9),
      },
})
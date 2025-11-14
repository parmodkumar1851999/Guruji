import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'


export default function StatusBarCom({backgroundColor,barStyle}) {
  return (
    <StatusBar
    barStyle={barStyle?barStyle:"dark-content"} 
    backgroundColor={backgroundColor?backgroundColor:Colors.White} 
  />
  )
}

const styles = StyleSheet.create({})
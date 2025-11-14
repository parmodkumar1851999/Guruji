import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppWapper from '../../Components/AppWapper'
import HomeYoutubVideosInsideInnerCom from '../../Components/HomeYoutubVideosInsideInnerCom'
import Colors from '../../Constants/Colors'

const HomeYoutubVideosInsideInner = ({route}) => {
  const { data } = route?.params;
  return (
    <AppWapper containerProps={{backgroundColor:Colors.WhiteLight}}>
      <HomeYoutubVideosInsideInnerCom  data={data}/>
    </AppWapper>
  )
}

export default HomeYoutubVideosInsideInner

const styles = StyleSheet.create({})
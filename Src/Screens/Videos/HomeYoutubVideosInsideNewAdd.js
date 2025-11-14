import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppWapper from '../../Components/AppWapper'
import HomeYoutubVideosInsideNewAddCom from '../../Components/HomeYoutubVideosInsideNewAddCom';

const HomeYoutubVideosInsideNewAdd = ({route}) => {
    const {data} = route?.params;
  return (
    <AppWapper>
      {/* <HomeYoutubVideosInsideCom data={data} /> */}
      <HomeYoutubVideosInsideNewAddCom data={data}/>

    </AppWapper>
  )
}

export default HomeYoutubVideosInsideNewAdd

const styles = StyleSheet.create({})
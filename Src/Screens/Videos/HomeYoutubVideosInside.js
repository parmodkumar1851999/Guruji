import {StyleSheet, Text} from 'react-native';
import React from 'react';
import AppWapper from '../../Components/AppWapper';
import GoBackBtnCom from '../../Components/GoBackBtnCom';
import HomeYoutubVideosInsideCom from '../../Components/HomeYoutubVideosInsideCom';

const HomeYoutubVideosInside = ({route}) => {
  const {data} = route?.params;
  return (
    <AppWapper>
        {/* <GoBackBtnCom /> */}
      <HomeYoutubVideosInsideCom 
      data={data} 
      />
    </AppWapper>
  );
};

export default HomeYoutubVideosInside;

const styles = StyleSheet.create({});

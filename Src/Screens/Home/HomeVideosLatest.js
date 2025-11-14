import {FlatList, Linking, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import Colors from '../../Constants/Colors';
import {hp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import HomeSeeAllCom from '../../Components/HomeSeeAllCom';
import ScreensName from '../../Navigations/ScreensName';
import {useNavigation} from '@react-navigation/native';
import {ToastCom} from '../../Components/ToastCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../Utils/apiurl';
import axios from 'axios';
import styles from './styles';
const HomeVideosLatest = ({}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [getHomeVideosLatest, setGetHomeVideosLatest] = useState([]);
      const [isRefreshing, setIsRefreshing] = useState(false);
  

  // *************** api worki start ***************
  useEffect(() => {
    _getHomeVideosLatest();
  }, []);
  const _getHomeVideosLatest = async () => {
    setIsLoading(true);
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    // if (!token) {
    //   console.error('No token found');
    //   setIsLoading(false);
    //   return;
    // }
    try {
      const requestUrl = ApiUrl.getHomeVideosLatestApi;
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Event details Top...:', response.data?.videos);
      setGetHomeVideosLatest(response.data?.videos);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      ToastCom({
        type: 'error',
        text2: err?.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false)
    }
  };
  // *************** api worki End ***************
   const _noVideoFound=()=>{
   ToastCom({
          type: 'error',
          text2:'Invalid Video Link... ',
        });
    }
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index?._id}
      activeOpacity={0.8}
      style={styles.cardContainer}>
      <View
        style={[
          styles.cardImgContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        {item?.uploadedfile ? (
          <FastImage
            source={{uri: item?.uploadedfile}}
            style={styles.cardImg}
            resizeMode="cover"
          />
        ) : (
          <View style={{width: '80%', height: '80%'}}>
            <FastImage
              source={ImagePath.ErrorHandel}
              style={[styles.cardImg, {marginTop: hp(-2)}]}
              resizeMode="cover"
            />
            <Text style={{textAlign: 'center', fontSize: hp(1.5)}}>
              No Image Found.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.cardContentContainer}>
        <Text
          style={[styles.cardContentTitle, {width: '100%'}]}
          numberOfLines={1}>
          {item?.videoName}
        </Text>
        <Text
          style={[styles.cardContentPara, {width: '100%'}]}
          numberOfLines={2}>
          {item?.videoDescription}
        </Text>
      </View>
      <Text
        style={{
          color: Colors.Primary,
          fontFamily: Fonts.InterMedium500,
          fontSize: hp(2),
        }}
                onPress={() =>{item?.videoLink? Linking.openURL(item?.videoLink):_noVideoFound()}} 
        >
        Watch Now
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <HomeSeeAllCom
      Title={'Succession Videos '}
      TitlePara={' Best of the succession video list .'}
        onPress={() => navigation.navigate(ScreensName.HOMESEEALLLATEST)}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={getHomeVideosLatest}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        removeClippedSubviews={false} // <- Add This
          refreshControl={
                              <RefreshControl refreshing={isRefreshing} onRefresh={_getHomeVideosLatest} />
                            }
      />
    </View>
  );
};

export default HomeVideosLatest;

import {FlatList, Linking, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import {ToastCom} from '../../Components/ToastCom';
import {ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './stylesSeeAll';
import LoaderCom from '../../Components/LoaderCom';

const HomeSeeAllTop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getHomeVideosTop, setGetHomeAllVideosTop] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
  // *************** api worki start ***************
  useEffect(() => {
    _getHomeSeeAllVideosTop();
  }, []);
  const _getHomeSeeAllVideosTop = async () => {
    setIsLoading(true);
    setIsRefreshing(true)
    const token = await AsyncStorage.getItem('token');
    try {
      const requestUrl = ApiUrl.getHomeVideosTopApi;
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Event details All Top...:', response.data?.videos);
      setGetHomeAllVideosTop(response.data?.videos);
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
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => alert('item')}
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

  const renderFooter = () => <View style={styles.footer}></View>;
  return (
    <View>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <View style={{marginLeft: wp(4), marginTop: hp(2)}}>
            <Text style={styles.todatNewTxt}>Today New Latest Videos</Text>
            <Text style={[styles.todatNewTxt, styles.bestTodayTxt]}>
               Best of the today video list update.
            </Text>
          </View>
          <FlatList
            columnWrapperStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            data={getHomeVideosTop}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={false} // <- Add This
             refreshControl={
                      <RefreshControl refreshing={isRefreshing} onRefresh={_getHomeSeeAllVideosTop} />
                    }
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: hp(2.5),
                    fontFamily: Fonts.InterMedium500,
                    color: Colors.Gray,
                  }}>
                  No Video Found! 🔍
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default HomeSeeAllTop;

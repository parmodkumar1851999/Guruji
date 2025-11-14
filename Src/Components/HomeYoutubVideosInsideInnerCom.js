import {
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import FastImage from 'react-native-fast-image';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import {t} from 'i18next';
import GoBackBtnCom from './GoBackBtnCom';
import {ToastCom} from './ToastCom';
import {ApiUrl} from '../Utils/apiurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderCom from './LoaderCom';

const HomeYoutubVideosInsideInnerCom = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [videosSubCatogaryInside, setvideosSubCatogaryInside] = useState([]);
  // *************** api worki start ***************
  useEffect(() => {
    _GetEventById();
  }, []);
  const _GetEventById = async () => {
    if (data) {
      setIsLoading(true);
      setIsRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getVideoSubCategoryInsideVideosApi}?subCategoryId=${data}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setvideosSubCatogaryInside(response.data?.videos);
        // console.log('daaaaa....',response.data?.videos)
      } catch (err) {
        // console.error('Error:', err.response ? err.response.data : err.message);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    } else {
      ToastCom({type: 'error', text2: 'somthing went wrong'});
    }
  };
  // *************** api worki End ***************
  const renderItem = ({item}) => (
    <View style={[styles.cardContainer,]}>
      <View style={[styles.cardImgContainer]}>
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

      <View style={styles.contentContainer}>
        <Text style={[styles.contentTtile, {width: '100%'}]} numberOfLines={2}>
          {item?.videoName}
          {item?.videoName}
          {item?.videoName}
        </Text>
        <Text style={[styles.contentTime, {width: '100%'}]} numberOfLines={1}>
          {item?.videoDescription}
        </Text>
        <Text
          onPress={() => Linking.openURL(item?.videoLink)}
          style={[styles.contentTime, styles.btnWatchNow]}>
          Watch Now
        </Text>
      </View>
    </View>
  );
  const renderFooter = () => (
    <View style={styles.footer}>
      {/* <Text style={styles.footerText}>List Footer</Text> */}
    </View>
  );
  return (
    <View style={{paddingHorizontal: wp(4),backgroundColor:Colors.White,height:'100%'}}>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View>
          <View
            style={{
              marginVertical: hp(2),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <GoBackBtnCom />
            <Text style={styles.todatNewTxt}>{t('VideoGallery')}</Text>
          </View>
          <View style={{marginBottom: hp(23)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={videosSubCatogaryInside}
              numColumns={1}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              removeClippedSubviews={false} // <- Add This
              //   ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
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
                    No Category Found! 🔍
                  </Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={_GetEventById}
                />
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeYoutubVideosInsideInnerCom;

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: wp(4),
    flex: 1,
  },
  todatNewTxt: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.3),
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
    backgroundColor: Colors.White,
    width: '100%',
    borderRadius: wp(2),
    marginBottom: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(1),
  },
  cardImgContainer: {
    width: '50%',
    height: hp(15),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
    // resizeMode:'center'
  },
  contentContainer: {
    width: '48%',
    borderRadius: wp(2),
    justifyContent: 'space-between',
  },
  contentTtile: {
    color: Colors.Black,
    fontSize: hp(2.2),
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
  },
  contentTime: {
    color: Colors.BlackOpacity,
    fontSize: hp(1.9),
    fontFamily: Fonts.PoppinsMedium500,
    textTransform: 'capitalize',
  },
  btnWatchNow: {
    paddingVertical: wp(1),
    color: Colors.Primary,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2),
  },
});

import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import ImagePath from '../Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ScreensName from '../Navigations/ScreensName';
import {t} from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ApiUrl} from '../Utils/apiurl';
import LoaderCom from './LoaderCom';

const HomeYoutubVideosCom = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [videosGallary, setvideosGallary] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // *************** api worki start ***************
  useEffect(() => {
    _getVideoCategory();
  }, []);
  const _getVideoCategory = async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const requestUrl = ApiUrl.getVideoCategoryApi;
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('getVideoCategoryApi...:', response.data?.data);
      setvideosGallary(response.data?.data);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      ToastCom({
        type: 'error',
        text2: err?.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  // *************** api worki End ***************
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index?._id}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(ScreensName.HOMEYOUTUBEVIDEOSINSIDE, {
          data: item?._id,
        })
      }
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
        <Text style={[styles.cardContentTitle]} numberOfLines={2}>
          {item?.shortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{justifyContent: 'center', alignSelf: 'center'}}>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View>
          <View style={{marginLeft: wp(4), marginTop: hp(2)}}>
            <Text style={styles.todatNewTxt}>{t('VideoGallery')}</Text>
          </View>
          <FlatList
            columnWrapperStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            data={videosGallary}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            removeClippedSubviews={false} // <- Add This
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={_getVideoCategory}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default HomeYoutubVideosCom;

const styles = StyleSheet.create({
  todatNewTxt: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.3),
    marginBottom: hp(2),
  },
  flatListContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(2.5),
    // marginTop: hp(2),
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
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  cardImgContainer: {
    width: wp(30),
    height: hp(15),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
    // resizeMode:'center'
  },
  cardContentContainer: {
    width: '100%',
    borderRadius: wp(2),
    paddingHorizontal: wp(1),
  },
  cardContentTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(1.9),
    textTransform: 'capitalize',
    marginBottom: hp(1),
  },
  footer: {
    marginBottom: hp(0),
  },
});

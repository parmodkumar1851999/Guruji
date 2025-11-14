import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import ImagePath from '../Constants/ImagePath';
import ScreensName from '../Navigations/ScreensName';
import {useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import GoBackBtnCom from './GoBackBtnCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../Utils/apiurl';
import axios from 'axios';
import {ToastCom} from './ToastCom';
import LoaderCom from './LoaderCom';

const VerticalSmallList = ({data}) => {
  const navigation = useNavigation();
  // const [isTabBution, setIsTabButton] = useState([data]);
  const [isTabBution, setIsTabButton] = useState([isTabBution]);
  const [isLoading, setIsLoading] = useState(false);
  const [videosGallary, setvideosGallary] = useState([]);
  const [videosRightGallary, setRightvideosGallary] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    setRightvideosGallary(data);
  }, [data]);
  // isTabBution
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
      setvideosGallary(response.data?.data);
    } catch (err) {
      // console.error('Error:', err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  const _GetEventById = async () => {
    if (isTabBution) {
      setIsLoading(true);
      setIsRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getVideoSubCategoryInsideApi}?videoCategoryId=${isTabBution}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRightvideosGallary(response.data);
        handleRefresh();
      } catch (err) {
        // console.error('Error:', err.response ? err.response.data : err.message);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    } else {
      ToastCom({type: 'error', text2: 'Event ID is required'});
    }
  };
  // *************** api worki End ***************
  useEffect(() => {
    _GetEventById();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [isTabBution]);
  const handleRefresh = () => {
    _getVideoCategory();
  };
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.8}
      onPress={() => setIsTabButton(item?._id)}
      style={[
        styles.cardContainer,
        {
          marginBottom: hp(2),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: wp(2),
          borderColor: isTabBution == item?._id ? Colors.Primary : Colors.White,
          borderWidth: isTabBution == item?._id ? 1 : 1,
          // data
          //     borderColor: isTabBution == item?._id ? Colors.Primary : Colors.White,
          // borderWidth: isTabBution == item?._id ? 1 : 1,
        },
      ]}>
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
      <View style={styles.cardContentContainer}>
        <Text
          style={[styles.cardContentTitle, {width: '96%'}]}
          numberOfLines={2}>
          {' '}
          {item?.shortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <FlatList
            columnWrapperStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            data={videosGallary}
            numColumns={1}
            renderItem={renderItem}
            keyExtractor={item => item?._id}
            removeClippedSubviews={false} // <- Add This
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
                onRefresh={_getVideoCategory}
              />
            }
          />
          {videosGallary.length ? (
            <VerticalBigList videosRightGallary={videosRightGallary} />
          ) : null}
        </View>
      )}
    </View>
  );
};

const VerticalBigList = ({data, videosRightGallary}) => {
  // console.log('daaa........oooo',videosRightGallary)
  // console.log('videosRightGallaryvideosRightGallary..',videosRightGallary)
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        // navigation.navigate(ScreensName.HOMEYOUTUBEVIDEOSINSIDEINNER, {
        //   data: item?._id,
        // })
        navigation.navigate(ScreensName.HOMEYOUTUBEVIDEOSINSIDENEWADD, {
          data: item?._id,
        })
      }
      style={[styles.cardContainer, styles.cardContainerBig]}>
      <View
        style={[
          styles.cardImgContainer,
          styles.cardImgContainerBig,
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
      <View
        style={[styles.cardContentContainer, styles.cardContentContainerBig]}>
        <Text
          style={[
            styles.cardContentTitle,
            styles.cardContentTitleBig,
            {width: '100%'},
          ]}
          numberOfLines={1}>
          {item?.subCategoryName}
        </Text>
        <Text
          style={[
            styles.cardContentTitle,
            styles.cardContentTitle,
            styles.cardContentTitleBigPara,
            {width: '100%'},
          ]}
          numberOfLines={2}>
          {item?.SubCategoryShortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      columnWrapperStyle={[
        styles.flatListContainer,
        {
          justifyContent: 'space-between',
          marginTop: hp(2),
        },
      ]}
      showsVerticalScrollIndicator={false}
      data={data ? data : videosRightGallary}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={item => item?._id}
      removeClippedSubviews={false} // <- Add This
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
            No subCategory Found! 🔍
          </Text>
        </View>
      )}
    />
  );
};

const HomeYoutubVideosInsideCom = ({data}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [videosSubCatogaryInside, setvideosSubCatogaryInside] = useState([]);
  // console.log('parmod...sumiiii',data)
  // *************** api worki start ***************
  useEffect(() => {
    _GetEventById();
  }, []);
  const _GetEventById = async () => {
    if (data) {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getVideoSubCategoryInsideApi}?videoCategoryId=${data}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setvideosSubCatogaryInside(response.data);
        // console.log
      } catch (err) {
        // console.error('Error:', err.response ? err.response.data : err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      ToastCom({type: 'error', text2: ' something went wrong'});
    }
  };
  // *************** api worki End ***************
  return (
    <View style={{paddingHorizontal: wp(2), marginBottom: hp(25)}}>
      <View
        style={{
          marginVertical: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <GoBackBtnCom />
        {/* <Text onPress={()=>navigation.navigate(ScreensName.HOMEYOUTUBEVIDEOSINSIDE)}>pamroddd....</Text> */}
        <Text style={styles.todatNewTxt}>{t('VideoGallery')}</Text>
      </View>
      <VerticalSmallList data={videosSubCatogaryInside} />
    </View>
  );
};

export default HomeYoutubVideosInsideCom;

const styles = StyleSheet.create({
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
    width: wp(17),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(0.5),
    marginBottom: hp(1),
  },
  cardImgContainer: {
    width: wp(12),
    height: hp(6.5),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp(1),
    borderTopRightRadius: wp(1),
    // resizeMode:'center'
  },
  cardContentContainer: {
    width: '100%',
    borderRadius: wp(2),
    paddingHorizontal: wp(0.5),
  },
  cardContentTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(1.5),
    textTransform: 'capitalize',
    marginVertical: hp(0.2),
    textAlign: 'center',
  },
  //   VerticalBigList styles
  cardContainerBig: {
    marginTop: hp(-2),
    marginBottom: hp(2),
    width: wp(38),
    borderRadius: wp(2),
  },
  cardImgContainerBig: {
    width: wp(38),
    height: hp(15.5),
  },
  cardImgBig: {
    marginVertical: hp(0.4),
  },
  cardContentContainerBig: {
    paddingHorizontal: wp(1),
  },
  cardContentTitleBig: {
    fontSize: hp(2),
    textAlign: 'left',
  },
  cardContentTitleBigPara: {
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.5),
    marginBottom: hp(1),
    textAlign: 'left',
  },
});

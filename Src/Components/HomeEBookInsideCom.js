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
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import GoBackBtnCom from './GoBackBtnCom';
import {ToastCom} from './ToastCom';
import axios from 'axios';
import {ApiUrl} from '../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderCom from './LoaderCom';

const VerticalSmallList = ({data}) => {
  const [isTabBution, setIsTabButton] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [videosGallary, setvideosGallary] = useState([]);
  const [BookSubCatogaryInside, setBookSubCatogaryInside] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // *************** api worki start ***************
  useEffect(() => {
    _getVideoCategory();
  }, []);
  useEffect(()=>{
    setBookSubCatogaryInside(data)
  },[data])
  const _getVideoCategory = async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const requestUrl = ApiUrl.getBookCategory;
      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('getBookCategory..vvdfvfdv.:', response.data?.data);
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
  // *************** api worki start ***************
  useEffect(() => {
    _GetEventById();
  }, []);
  const _GetEventById = async () => {
    if (isTabBution) {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getBookSubCategoryApi}?bookCategoryId=${isTabBution}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookSubCatogaryInside(response?.data?.books);
        handleRefresh();
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
        },
      ]}>
      <View style={styles.cardImgContainer}>
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
              style={[styles.cardImg, {marginTop: hp(-1)}]}
              resizeMode="cover"
            />
            <Text style={{textAlign: 'center', fontSize: hp(1.2)}}>
              No Image Found.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.cardContentContainer}>
        <Text
          style={[
            styles.cardContentTitle,
            {
              color: Colors.Gray,
              fontFamily: Fonts.PoppinsMedium500,
              width: '100%',
            },
          ]}
          numberOfLines={1}>
          {item?.authorName}
        </Text>
        <Text
          style={[
            styles.cardContentTitle,
            {lineHeight: hp(1.5), width: '100%'},
          ]}
          numberOfLines={2}>
          {item?.description}
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
                  No Book Category Found! 🔍
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
          {/* {isTabBution == 0 ? <VerticalBigList setBookSubCatogaryInside={setBookSubCatogaryInside} /> : null} */}
          {videosGallary.length ? (
            <VerticalBigList BookSubCatogaryInside={BookSubCatogaryInside} />
          ) : null}
        </View>
      )}
    </View>
  );
};
const VerticalBigList = ({data, BookSubCatogaryInside}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(ScreensName.HOMEBOOKDETAILS, {
          data:item,
        })
      }
      style={[styles.cardContainer, styles.cardContainerBig]}>
      <View
        style={[
          styles.cardImgContainer,
          styles.cardImgContainerBig,
          {alignItems: 'center'},
        ]}>
        {item?.uploadedfile ? (
          <FastImage
            source={{uri: item?.uploadedfile}}
            style={[styles.cardImg, {width: '90%'}]}
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
            {color: Colors.Gray, fontSize: hp(1.5), width: '100%'},
          ]}
          numberOfLines={1}>
          {item?.bookName}
        </Text>
        <Text
          style={[
            styles.cardContentTitle,
            styles.cardContentTitleBig,
            ,
            {width: '100%', marginTop: hp(-1.5), fontSize: hp(1.8)},
          ]}
          numberOfLines={2}>
          {item?.bookDescription}
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
      data={data ? data : BookSubCatogaryInside}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={item => item._id}
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
            No Book Category Found! 🔍
          </Text>
        </View>
      )}
    />
  );
};
const HomeEBookInsideCom = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [BookSubCatogaryInside, setBookSubCatogaryInside] = useState([]);
  // *************** api worki start ***************
  useEffect(() => {
    _GetEventById();
  }, []);
  const _GetEventById = async () => {
    if (data) {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getBookSubCategoryApi}?bookCategoryId=${data}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookSubCatogaryInside(response?.data?.books);
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
    <View style={{paddingHorizontal: wp(2), paddingBottom: hp(25),backgroundColor:Colors.White}}>
      <View
        style={{
          marginVertical: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <GoBackBtnCom />
        <Text style={styles.todatNewTxt}>{t('EBooks')}</Text>
      </View>
      <VerticalSmallList data={BookSubCatogaryInside} />
    </View>
  );
};

export default HomeEBookInsideCom;

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
    width: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(0.5),
    marginTop: hp(1),
  },
  cardImgContainer: {
    width: wp(13),
    height: hp(7.5),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp(1),
    borderTopRightRadius: wp(1),
  },
  cardContentContainer: {
    width: '100%',
    borderRadius: wp(2),
    alignItems: 'center',
  },
  cardContentTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(1.5),
    textTransform: 'capitalize',
    marginBottom: hp(0.2),
    textAlign: 'center',
  },
  cardContainerBig: {
    marginTop: hp(-0.9),
    marginBottom: hp(2),
    width: wp(36),
    borderRadius: wp(2),
  },
  cardImgContainerBig: {
    width: wp(38),
    height: hp(27.5),
  },
  cardImgBig: {
    marginVertical: hp(0.4),
  },
  cardContentContainerBig: {
    paddingHorizontal: wp(1),
  },
  cardContentTitleBig: {
    fontSize: hp(2.2),
    marginVertical: hp(1),
    marginBottom: hp(1),
  },
});

import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import {t} from 'i18next';
import Colors from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import FastImage from 'react-native-fast-image';
import {ToastCom} from '../../Components/ToastCom';
import {ApiUrl} from '../../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoaderCom from '../../Components/LoaderCom';
import ImagePath from '../../Constants/ImagePath';
import GoBackBtnCom from '../../Components/GoBackBtnCom';
import moment from 'moment';
const EventFullDetails = ({route}) => {
  const {getEventFullDesc} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [userDataById, setUserDataById] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // *************** api worki start ***************
  useEffect(() => {
    _GetEventById();
  }, []);
  const _GetEventById = async () => {
    if (getEventFullDesc) {
      setIsLoading(true);
      setIsRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getEnventByIdApi}?id=${getEventFullDesc}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('Event details:', response.data?.data);
        setUserDataById(response.data?.data);
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
    } else {
      ToastCom({type: 'error', text2: 'Event ID is required'});
    }
  };
  // *************** api worki End ***************

  return (
    <AppWapper>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <View style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp(2),
              paddingVertical: hp(2),
            }}>
            <GoBackBtnCom />
            <Text
              style={[
                styles.bookTitle,
                {textAlign: 'center', color: Colors.Primary, flex: 1},
              ]}>
              {t('EventDetails')}
            </Text>
          </View>
          <ScrollView
            style={styles.contentContianer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={_GetEventById}
              />
            }>
            <View style={[styles.cardImgContainer]}>
              <View style={[styles.EnventImgContainer, {alignItems: 'center'}]}>
                {userDataById?.uploadedfile ? (
                  <FastImage
                    source={{uri: userDataById?.uploadedfile}}
                    style={styles.EnventImg01}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={{width: '50%', height: '50%'}}>
                    <FastImage
                      source={ImagePath.ErrorHandel}
                      style={[styles.EnventImg01]}
                      resizeMode="contain"
                    />
                    <Text style={{textAlign: 'center'}}>No Image Found.</Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={[
                  styles.bookAuthor,
                  {
                    color: Colors.BlackOpacity,
                    fontFamily: Fonts.InterMedium500,
                  },
                ]}>
                {userDataById?.address}
              </Text>
              <Text
                style={[
                  styles.bookAuthor,
                  {
                    color: Colors.BlackOpacity,
                    fontFamily: Fonts.InterMedium500,
                  },
                ]}>
                {userDataById?.time}
              </Text>
            </View>
            <Text style={styles.bookAuthor}>
              {moment(userDataById?.date).format('DD-MMMM-YYYY')
                            ? moment(userDataById?.date).format('DD-MMMM-YYYY')
                            : 'No Start Date Found'}
              </Text>
            <Text style={styles.bookTitle}>{userDataById?.title}</Text>
            <Text style={styles.bookPara}>{userDataById?.description}</Text>
            <Text style={[styles.bookTitle, styles.bookPara]}>
              {getEventFullDesc?.title}
            </Text>

            {userDataById?.event ? (
              <View>
                {userDataById?.event[0]?._id ? (
                  <View style={styles.eventTitleOuter}>
                    <Text style={styles.eventTitle}>{t('EventTitle')}</Text>
                    <Text style={styles.eventTitle}>{t('EventDate')}</Text>
                    <Text style={styles.eventTitle}>{t('EventTiming')}</Text>
                  </View>
                ) : null}
                {userDataById?.event.map((item, index) => (
                  <View
                    key={item?._id}
                    style={[
                      styles.eventTitleOuter,
                      styles.EventFullDetails,
                      index % 2 === 1 && {
                        backgroundColor: 'rgba(255,144,18,.2)',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.EventFullDetailsTitle,
                        styles.EventFullDetailsTitleSecound,
                        {textAlign: 'left'},
                      ]}>
                      {item?.eventType}
                    </Text>
                    <Text
                      style={[
                        styles.EventFullDetailsTitle,
                        styles.EventFullDetailsTitleSecound,
                        {textAlign: 'center'},
                      ]}>
                      {item?.startDate}
                    </Text>
                    <Text
                      style={[
                        styles.EventFullDetailsTitle,
                        styles.EventFullDetailsTitleSecound,
                        {textAlign: 'right'},
                      ]}>
                      {item?.startTime}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{color: 'red'}}>No Event details Found</Text>
            )}
          </ScrollView>
        </View>
      )}
    </AppWapper>
  );
};

export default EventFullDetails;

const styles = StyleSheet.create({
  cardImgContainer: {
    width: wp(96),
    height: hp(40),
    borderRadius: wp(2),
    alignSelf: 'center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp(1),
    borderTopRightRadius: wp(1),
  },
  contentContianer: {
    marginHorizontal: wp(4),
  },
  bookTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.5),
    textTransform: 'capitalize',
  },
  bookAuthor: {
    color: Colors.Gray,
    fontSize: hp(2),
    textTransform: 'capitalize',
    fontFamily: Fonts.PoppinsRegular400,
  },
  bookPara: {
    fontSize: hp(1.8),
    textAlign: 'justify',
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsRegular400,
    height: 'auto',
  },
  EnventImg01: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: wp(6),
  },
  eventTitleOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(2),
    backgroundColor: Colors.Primary,
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  eventTitle: {
    fontSize: hp(2),
    color: Colors.White,
    fontFamily: Fonts.InterBold700,
  },
  EventFullDetails: {
    borderTopLeftRadius: wp(0),
    borderTopRightRadius: wp(0),
    backgroundColor: null,
  },
  EventFullDetailsTitle: {
    fontSize: hp(1.8),
    color: Colors.Black,
    fontFamily: Fonts.InterMedium500,
  },
  EventFullDetailsTitleSecound: {
    width: '30%',
  },
});

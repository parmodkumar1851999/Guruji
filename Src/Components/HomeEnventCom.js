import {
  BackHandler,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';
import FastImage from 'react-native-fast-image';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import {t} from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../Utils/apiurl';
import {ToastCom} from './ToastCom';
import ScreensName from '../Navigations/ScreensName';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoaderCom from './LoaderCom';
import moment from 'moment';

const HomeEnventCom = ({}) => {
  const navigation = useNavigation();
  const [expandedItems, setExpandedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveEventDetials, setSaveEventDetails] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    _getUserData();
  }, []);
  const _getUserData = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    // console.log('lllll', token)
    try {
      setIsLoading(true);
      setIsRefreshing(true);
      const response = await fetch(ApiUrl.getAllEnventApi, {
        method: 'Get',
        // body: fd,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });
      const result = await response.json();
      // console.log('Event  success...', result?.data);
      setSaveEventDetails(result?.data);
      // ToastCom({type: 'Success', text2: result?.message});
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
      ToastCom({type: 'error', text2: result?.message});
    }
  };

  const toggleText = _id => {
    setExpandedItems(prevState => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));
  };

  // page reload for updated data calling  focuse Api  Start
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        _getUserData();
        return false;
      },
    );
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      _getUserData();
      Alert.alert('Confirm exit', 'Do you want to go back?', [
        {text: 'Cancel', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return () => {
      backHandler.remove();
      navigation.removeListener('beforeRemove');
    };
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      _getUserData();
      return;
    }, []),
  );
  // page reload for updated data calling  focuse Api  End
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      key={index?._id}
      onPress={() =>
        navigation.navigate(ScreensName.EVENTFULLDETAILS, {
          getEventFullDesc: item?._id,
        })
      }
      style={styles.EnventContianer}>
      <View style={[styles.EnventImgContainer, {alignItems: 'center'}]}>
        {item?.uploadedfile ? (
          <FastImage
            source={{uri: item?.uploadedfile}}
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
      {/* content  */}
      <View style={{marginLeft: wp(1)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[styles.EnventDateTxt, {marginTop: hp(1), width: '50%'}]}>
            {moment(item?.date).format('DD-MMMM-YYYY')
              ? moment(item?.date).format('DD-MMMM-YYYY')
              : 'No Start Date Found'}
          </Text>
          <Text
            style={[
              styles.EnventDateTxt,
              {marginTop: hp(1), width: '50%', textAlign: 'right'},
            ]}>
            {item?.time}
          </Text>
        </View>
        <Text style={[styles.EnventDateTxt, styles.EnventTitle]}>
          {item?.title}
        </Text>
        <Text style={styles.EnventPara}>{item?.description}</Text>
        {/* {expandedItems ? (
          <Text
            numberOfLines={expandedItems[item._id] ? 0 : 1}
            style={styles.EnventPara}>
            {item?.description}
          </Text>
        ) : null} */}
        {/* <Text onPress={() => toggleText(item._id)} style={styles.knowMoreBtn}>
          {' '}
          {expandedItems[item._id]
            ? `${t('ReadLess')}`
            : `${t('KnowMore')}`}{' '}
        </Text> */}

        <Text
          onPress={() =>
            navigation.navigate(ScreensName.EVENTFULLDETAILS, {
              getEventFullDesc: item?._id,
            })
          }
          style={styles.knowMoreBtn}>
          {' '}
          View More
        </Text>
      </View>
    </TouchableOpacity>
  );
  const renderFooter = () => (
    <View style={styles.footer}>
      {/* <Text style={styles.footerText}>List Footer</Text> */}
    </View>
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoaderCom />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={saveEventDetials}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={false} // <- Add This
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_getUserData}
            />
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
                No Event Found! 🔍
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeEnventCom;

const styles = StyleSheet.create({
  EnventContianer: {
    marginBottom: hp(2),
  },
  EnventImgContainer: {
    width: '100%',
    height: hp(23),
    borderRadius: wp(2),
  },
  EnventImg01: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: wp(2),
  },
  EnventDateTxt: {
    color: Colors.Black,
    fontFamily: Fonts.InterMedium500,
    fontSize: hp(2),
    textTransform: 'capitalize',
  },
  EnventTitle: {
    marginVertical: hp(0.5),
    fontFamily: Fonts.InterBold700,
  },
  EnventPara: {
    color: Colors.Gray,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.8),
    textTransform: 'capitalize',
  },
  knowMoreBtn: {
    color: Colors.Primary,
    fontFamily: Fonts.InterMedium500,
    fontSize: hp(2),
    textTransform: 'capitalize',
    width: '30%',
    padding: wp(1),
    paddingLeft: wp(0),
  },
  footer: {
    marginBottom: hp(30),
  },
});

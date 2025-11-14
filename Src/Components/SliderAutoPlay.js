import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import ImagePath from '../Constants/ImagePath';
import Colors from '../Constants/Colors';
import LoaderCom from './LoaderCom';
import Fonts from '../Constants/Fonts';
import ModalCom from './ModalCom';
import {t} from 'i18next';
import ButtonCom from './ButtonCom';
import {ApiUrl} from '../Utils/apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastCom} from './ToastCom';
import HeaderCom from './HeaderCom';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SliderAutoPlay() {
  const data = [
    {
      id: 1,
      title: 'Slide 1',
      image: ImagePath.sliderImg01,
    },
    {
      id: 2,
      title: 'Slide 2',
      image: ImagePath.sliderImg02,
    },
    {
      id: 3,
      title: 'Slide 3',
      image: ImagePath.sliderImg03,
    },
     {
      id: 4,
      title: 'Slide 4',
      image: ImagePath.sliderImg01,
    },
      {
      id: 5,
      title: 'Slide 3',
      image: ImagePath.sliderImg02,
    },
      {
      id: 6,
      title: 'Slide 6',
      image: ImagePath.sliderImg03,
    },
      {
      id: 7,
      title: 'Slide 7',
      image: ImagePath.sliderImg01,
    },
      {
      id: 8,
      title: 'Slide 8',
      image: ImagePath.sliderImg02,
    },
      {
      id: 9,
      title: 'Slide 9',
      image: ImagePath.sliderImg03,
    },
      {
      id: 10,
      title: 'Slide 10',
      image: ImagePath.sliderImg01,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const [banner, setBanner] = useState([]);
  const [bannerEvent, setBannerEvent] = useState([]);
  const _getshowBannder = userData => {
    setBannerEvent(userData);
    setIsLogout(userData);
  };
  useEffect(() => {
    _getUserData();
  }, []);
  const _getUserData = async () => {
    let token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err),
    );
    try {
      setLoading(true);
      const response = await fetch(ApiUrl.getAllBannerApi, {
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
      setBanner(result?.data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      ToastCom({type: 'error', text2: result?.message});
    }
  };

  const autoRotate = () => {
    if (banner.length === 0) return;
    const nextIndex = (currentIndex + 1) % banner.length;
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, banner.length]);

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
    }
  });
  const viewConfigRef = useRef({
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 50,
  });
  const renderItems = ({item, index}) => (
    <TouchableOpacity
      key={item?._id}
      onPress={() => _getshowBannder({userData: item, isLoggedOut: true})}
      // onPress={() => setIsLogout(true)}
      style={styles.carouselItem}>
      <Image source={{uri: item?.uploadedfile1}} style={styles.sliderImg} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.contianer}>
      {banner.length === 0 ? (
        // Render "No Data Found" message if banner is empty
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Banner Found</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={banner}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          removeClippedSubviews={false} // <- Add This
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      )}
      <TouchableOpacity style={styles.innerContainer}>
        {banner.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: currentIndex == index ? 20 : 7.5,
                height: 7.5,
                borderRadius: 10,
                backgroundColor:
                  currentIndex == index ? Colors.Primary : Colors.Gray,
                margin: wp(1),
                marginTop: -hp(6),
              }}></View>
          );
        })}
      </TouchableOpacity>

      {/* Modal Bnnaer Event   Start*/}
      <ModalCom
        contianerStyle={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isLogout}
        onBackdropPress={() => setIsLogout(false)}>
        <View style={[styles.modalContainer, styles.modalLogoutContainer]}>
          {loading ? (
            <LoaderCom />
          ) : (
            <ImageBackground
              source={ImagePath.OfferBgImg}
              style={[
                styles.backgroundImgContianer,
                {height: '100%', backgroundColor: 'red'},
              ]}>
              {/* <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.bannerTitle,
                    {fontFamily: Fonts.InterRegular400, fontSize: hp(2)},
                  ]}>
                  LOWEYWEFEWFUI EQ
                </Text>
                <Text
                  style={[
                    styles.bannerTitle,
                    {fontFamily: Fonts.InterRegular400, fontSize: hp(2)},
                  ]}>
                  lOREM lYUUPS WEFEWNOI
                </Text>
                <Text style={styles.bannerTitle}>LOWEQF AWM</Text>
              </View> */}
              <View style={{}}>
                <ImageBackground
                  resizeMode="cover"
                  source={{
                    uri: bannerEvent?.userData?.uploadedfile2
                      ? bannerEvent?.userData?.uploadedfile2
                      : 'NO Banner Image',
                  }}
                  style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => setIsLogout(false)}
                    style={{
                      backgroundColor: Colors.White,
                      width: wp(10),
                      height: wp(10),
                      position: 'absolute',
                      top: hp(0),
                      borderRadius: wp(10),
                      left: wp(2),
                      top: hp(2),
                    }}>
                    <HeaderCom
                      type={'Ionicons'}
                      name={'chevron-back'}
                      color={Colors.Primary}
                      onPress={() => setIsLogout(false)}
                      propsContainer={{
                        backgroundColor: null,
                        marginTop: hp(-1.5),
                        marginLeft: wp(-1.5),
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.White,
                      textAlign: 'center',
                      marginTop: hp(-2),
                    }}>
                    {bannerEvent?.userData?.uploadedfile2
                      ? null
                      : 'No Banner Image Found...'}
                  </Text>
                  <ButtonCom
                    label={t('Go To Event')}
                    propsContainer={styles.propsContainerBtn}
                    propsLabel={styles.propsLabelTitle}
                    onPress={() => {
                      bannerEvent?.userData?.CTALink
                        ? Linking.openURL(`${bannerEvent?.userData?.CTALink}`)
                        : Linking.openURL(
                            'https://www.youtube.com/@tvshambhusharanlataji9735/featured',
                          );
                    }}
                  />
                </ImageBackground>
              </View>
            </ImageBackground>
          )}
        </View>
      </ModalCom>
      {/* Modal Logout  End*/}
    </View>
  );
}
const styles = StyleSheet.create({
  contianer: {
    width: '98%',
    alignSelf: 'center',
    paddingBottom: hp(4),
    marginLeft: wp(-7),
  },
  innerContainer: {
    position: 'absolute',
    bottom: hp(-5),
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    marginBottom: hp(5),
    marginLeft: wp(4),
  },
  carouselItem: {
    width: windowWidth,
    marginTop: hp(1),
    borderRadius: wp(2),
    padding: wp(1),
  },
  sliderImg: {
    width: '100%',
    height: 180,
    height: hp(20),
    borderRadius: wp(2),
    // resizeMode: 'repeat',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  backgroundImgContianer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  propsContainerBtn: {
    borderWidth: 1,
    borderColor: Colors.White,
    width: '50%',
    borderRadius: wp(2),
    paddingVertical: hp(1),
    alignSelf: 'center',
    marginBottom: hp(4),
  },
  modalTitle02: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2.3),
    marginLeft: wp(2),
    marginTop: hp(0),
    marginBottom: hp(1),
  },
  propsLabelTitle: {
    color: Colors.Black,
    fontSize: hp(2),
    color: Colors.White,
  },
  bannerTitle: {
    textAlign: 'center',
    fontFamily: Fonts.InterBold700,
    color: Colors.White,
    lineHeight: hp(5),
    fontSize: hp(3),
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.Gray,
    textAlign: 'center',
  },
});

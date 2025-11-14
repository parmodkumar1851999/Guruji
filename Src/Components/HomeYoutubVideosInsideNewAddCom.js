// import {
//   FlatList,
//   Linking,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {ToastCom} from './ToastCom';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ApiUrl} from '../Utils/apiurl';
// import axios from 'axios';
// import {hp, wp} from '../Constants/Responsive';
// import GoBackBtnCom from './GoBackBtnCom';
// import Fonts from '../Constants/Fonts';
// import {t} from 'i18next';
// import Colors from '../Constants/Colors';
// import FastImage from 'react-native-fast-image';
// import LoaderCom from './LoaderCom';
// import ImagePath from '../Constants/ImagePath';

// const VerticalBigList = ({dataa}) => {
//   // console.log('pamrod.....',dataa)
//   const navigation = useNavigation();
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const handleRefresh = () => {
//     // _getVideoCategory();
//     setIsRefreshing(true);
//     setIsRefreshing(false);
//   };
//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={[styles.cardContainer, styles.cardContainerBig]}>
//       <View
//         style={[
//           styles.cardImgContainer,
//           styles.cardImgContainerBig,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         {item?.uploadedfile ? (
//           <FastImage
//             source={{uri: item?.uploadedfile}}
//             style={styles.cardImg}
//             resizeMode="cover"
//           />
//         ) : (
//           <View style={{width: '80%', height: '80%'}}>
//             <FastImage
//               source={ImagePath.ErrorHandel}
//               style={[styles.cardImg, {marginTop: hp(-2)}]}
//               resizeMode="cover"
//             />
//             <Text style={{textAlign: 'center', fontSize: hp(1.5)}}>
//               No Image Found.
//             </Text>
//           </View>
//         )}
//       </View>
//       <View
//         style={[styles.cardContentContainer, styles.cardContentContainerBig]}>
//         <Text
//           style={[
//             styles.cardContentTitle,
//             styles.cardContentTitleBig,
//             {width: '100%'},
//           ]}
//           numberOfLines={1}>
//           {item?.videoName}
//         </Text>
//         <Text
//           style={[
//             styles.cardContentTitle,
//             styles.cardContentTitle,
//             styles.cardContentTitleBigPara,
//             {width: '100%'},
//           ]}
//           numberOfLines={2}>
//           {/* {item?.SubCategoryShortDescription} */}
//           {item?.videoDescription}
//         </Text>
//         <Text
//           // onPress={() => Linking.openURL(item?.videoLink)}
//           onPress={() => {
//             const youtubelink = `${
//               item?.videoLink ? item?.videoLink : alert('Not a valid Url Link')
//             }`;
//             Linking.openURL(youtubelink).catch(err =>
//               console.error('Not a valid Url Link:', err),
//             );
//           }}
//           style={[styles.contentTime, styles.btnWatchNow]}>
//           Watch Now
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
//   return (
//     <FlatList
//       columnWrapperStyle={[
//         styles.flatListContainer,
//         {
//           justifyContent: 'space-between',
//           marginTop: hp(2),
//         },
//       ]}
//       showsVerticalScrollIndicator={false}
//       data={dataa}
//       numColumns={2}
//       renderItem={renderItem}
//       keyExtractor={item => item?._id}
//       removeClippedSubviews={false} // <- Add This
//       refreshControl={
//         <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
//       }
//       ListEmptyComponent={() => (
//         <View
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}>
//           <Text
//             style={{
//               fontSize: hp(2.5),
//               fontFamily: Fonts.InterMedium500,
//               color: Colors.Gray,
//             }}>
//             No subCategory Found! 🔍
//           </Text>
//         </View>
//       )}
//     />
//   );
// };

// const HomeYoutubVideosInsideNewAddCom = ({data}) => {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [videosSubCatogaryInside, setvideosSubCatogaryInside] = useState([]);

//   // adddd###############
//   // const [isTabBution, setIsTabButton] = useState([isTabBution]);
//   const [isTabBution, setIsTabButton] = useState(null);  // Initially null

//   const [videosRightGallary, setRightvideosGallary] = useState([]);
//   console.log('pamorddd.....',isTabBution)
//   console.log('videosRightGallary.....',videosRightGallary)

//   useEffect(() => {
//     // Agar data available hai toh pehla item select karo
//     if (videosSubCatogaryInside && videosSubCatogaryInside.length > 0) {
//       setIsTabButton(videosSubCatogaryInside[0]._id);  // Default _id set karna
//     }
//   }, []);

//   // *************** api worki start ***************
//   useEffect(() => {
//     _GetEventById();
//   }, []);
//   const _GetEventById = async () => {
//     if (data) {
//       setIsLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       try {
//         const requestUrl = `${ApiUrl.getVideoSubCategoryInsideNEWApi}?videoSubCategoryId=${data}`;
//         const response = await axios.get(requestUrl, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setvideosSubCatogaryInside(response.data);
//       } catch (err) {
//         // console.error('Error:', err.response ? err.response.data : err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       ToastCom({type: 'error', text2: ' something went wrong'});
//     }
//   };
//   // *************** api worki End ***************

//   // ##################NEW APi Work

//   // useEffect(() => {
//   //   _GetEventByIdd();
//   //   setRightvideosGallary('');
//   // }, [isTabBution]);

//   useEffect(() => {
//     if (isTabBution) {
//       _GetEventByIdd();  // Jab _id set ho jaye toh API call ho.
//       setRightvideosGallary('');
//     }
//   }, [isTabBution]);

//   const _GetEventByIdd = async () => {
//     if (isTabBution) {
//       setIsLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       try {
//         const defaultId = '67dbe1023242ec48e1f9cb1f';
//         const requestUrl = `${ApiUrl.getVideoSubCategoryInsideNEWINSIDEApi}?subSubCategoryId=${isTabBution}`;
//         // const requestUrl = `${ApiUrl.getVideoSubCategoryInsideNEWINSIDEApi}?subSubCategoryId=67dbe1023242ec48e1f9cb1f`;
//         const response = await axios.get(requestUrl, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // console.log('999999999999999999.........',response.data?.videos)
//         setRightvideosGallary(response.data?.videos);
//       } catch (err) {
//         // console.error('Error:', err.response ? err.response.data : err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       ToastCom({type: 'error', text2: ' something went wrong'});
//     }
//   };

//   const renderItem = ({item, index}) => (
//     <TouchableOpacity
//       key={index}
//       activeOpacity={0.8}
//       onPress={() => setIsTabButton(item?._id)}
//       style={[
//         styles.cardContainer,
//         {
//           marginBottom: hp(2),
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderRadius: wp(2),
//           borderColor: isTabBution == item?._id ? Colors.Primary : Colors.White,
//           borderWidth: isTabBution == item?._id ? 1 : 1,
//         },
//       ]}>
//       <View style={[styles.cardImgContainer]}>
//         {item?.uploadedfile ? (
//           <FastImage
//             source={{uri: item?.uploadedfile}}
//             style={styles.cardImg}
//             resizeMode="cover"
//           />
//         ) : (
//           <View style={{width: '80%', height: '80%'}}>
//             <FastImage
//               source={ImagePath.ErrorHandel}
//               style={[styles.cardImg, {marginTop: hp(-2)}]}
//               resizeMode="cover"
//             />
//             <Text style={{textAlign: 'center', fontSize: hp(1.5)}}>
//               No Image Found.
//             </Text>
//           </View>
//         )}
//       </View>
//       <View style={styles.cardContentContainer}>
//         <Text
//           style={[styles.cardContentTitle, {width: '96%'}]}
//           numberOfLines={2}>
//           {' '}
//           {item?.subSubCategoryName}
//           {`\n`}
//           {item?.subSubCategoryShortDescription}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
//   return (
//     <View style={{paddingHorizontal: wp(2), marginBottom: hp(25)}}>
//       <View
//         style={{
//           marginVertical: hp(2),
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <GoBackBtnCom />
//         <Text style={styles.todatNewTxt}>{t('VideoGallery')}</Text>
//       </View>

//       <View style={{flexDirection: 'row'}}>
//         <FlatList
//           columnWrapperStyle={styles.flatListContainer}
//           showsVerticalScrollIndicator={false}
//           data={videosSubCatogaryInside}
//           numColumns={1}
//           renderItem={renderItem}
//           keyExtractor={item => item?._id}
//           removeClippedSubviews={false} // <- Add This
//           ListEmptyComponent={() => (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flex: 1,
//               }}>
//               <Text
//                 style={{
//                   fontSize: hp(2.5),
//                   fontFamily: Fonts.InterMedium500,
//                   color: Colors.Gray,
//                 }}>
//                 No Category Found! 🔍
//               </Text>
//             </View>
//           )}
//         />
//         {isLoading ? (
//           <View style={{width: '80%'}}>
//             <LoaderCom />
//           </View>
//         ) : (
//           <VerticalBigList dataa={videosRightGallary} />
//         )}
//       </View>
//     </View>
//   );
// };

// export default HomeYoutubVideosInsideNewAddCom;

// const styles = StyleSheet.create({
//   todatNewTxt: {
//     color: Colors.Primary,
//     fontFamily: Fonts.InterBold700,
//     fontSize: hp(2.3),
//   },
//   cardContainer: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 1.41,
//     elevation: 1,
//     backgroundColor: Colors.White,
//     width: wp(17),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: wp(0.5),
//     marginBottom: hp(1),
//   },
//   cardImgContainer: {
//     width: wp(12),
//     height: hp(6.5),
//     borderRadius: wp(2),
//   },
//   cardImg: {
//     width: '100%',
//     height: '100%',
//     borderTopLeftRadius: wp(1),
//     borderTopRightRadius: wp(1),
//     // resizeMode:'center'
//   },
//   cardContentContainer: {
//     width: '100%',
//     borderRadius: wp(2),
//     paddingHorizontal: wp(0.5),
//   },
//   cardContentTitle: {
//     color: Colors.Black,
//     fontFamily: Fonts.InterBold700,
//     fontSize: hp(1.5),
//     textTransform: 'capitalize',
//     marginVertical: hp(0.2),
//     textAlign: 'center',
//   },
//   //   VerticalBigList styles
//   cardContainerBig: {
//     marginTop: hp(-2),
//     marginBottom: hp(2),
//     width: wp(38),
//     borderRadius: wp(2),
//   },
//   cardImgContainerBig: {
//     width: wp(38),
//     height: hp(15.5),
//   },
//   cardImgBig: {
//     marginVertical: hp(0.4),
//   },
//   cardContentContainerBig: {
//     paddingHorizontal: wp(1),
//   },
//   cardContentTitleBig: {
//     fontSize: hp(2),
//     textAlign: 'left',
//   },
//   cardContentTitleBigPara: {
//     fontFamily: Fonts.PoppinsMedium500,
//     fontSize: hp(1.5),
//     marginBottom: hp(1),
//     textAlign: 'left',
//   },
//   contentTime: {
//     color: Colors.BlackOpacity,
//     fontSize: hp(1.9),
//     fontFamily: Fonts.PoppinsMedium500,
//     textTransform: 'capitalize',
//     textAlign: 'center',
//   },
//   btnWatchNow: {
//     paddingVertical: wp(1),
//     color: Colors.Primary,
//     fontFamily: Fonts.PoppinsMedium500,
//     fontSize: hp(2),
//   },
// });

import {
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ToastCom} from './ToastCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../Utils/apiurl';
import axios from 'axios';
import {hp, wp} from '../Constants/Responsive';
import GoBackBtnCom from './GoBackBtnCom';
import Fonts from '../Constants/Fonts';
import {t} from 'i18next';
import Colors from '../Constants/Colors';
import FastImage from 'react-native-fast-image';
import LoaderCom from './LoaderCom';
import ImagePath from '../Constants/ImagePath';

const VerticalBigList = ({dataa}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
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
          {item?.videoName}
        </Text>
        <Text
          style={[
            styles.cardContentTitle,
            styles.cardContentTitleBigPara,
            {width: '100%'},
          ]}
          numberOfLines={2}>
          {item?.videoDescription}
        </Text>
        <Text
          onPress={() => {
            const youtubelink = `${
              item?.videoLink ? item?.videoLink : alert('Not a valid Url Link')
            }`;
            Linking.openURL(youtubelink).catch(err =>
              console.error('Not a valid Url Link:', err),
            );
          }}
          style={[styles.contentTime, styles.btnWatchNow]}>
          Watch Now
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataa}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={item => item?._id}
      removeClippedSubviews={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
      ListEmptyComponent={() => (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: Fonts.InterMedium500,
              color: Colors.Gray,
            }}>
            No videos found! 🔍
          </Text>
        </View>
      )}
      columnWrapperStyle={
        dataa.length > 1 ? {justifyContent: 'space-between'} : null
      }
    />
  );
};

const HomeYoutubVideosInsideNewAddCom = ({data}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [videosSubCatogaryInside, setVideosSubCatogaryInside] = useState([]);
  const [isTabBution, setIsTabButton] = useState(null);
  const [videosRightGallary, setRightvideosGallary] = useState([]);

  useEffect(() => {
    _GetEventById();
  }, []);

  const _GetEventById = async () => {
    if (data) {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getVideoSubCategoryInsideNEWApi}?videoSubCategoryId=${data}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideosSubCatogaryInside(response.data);
        if (response.data && response.data.length > 0) {
          setIsTabButton(response.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      ToastCom({type: 'error', text2: 'Something went wrong'});
    }
  };

  useEffect(() => {
    if (isTabBution) {
      _GetEventByIdd();
      setRightvideosGallary('');
    }
  }, [isTabBution]);

  const _GetEventByIdd = async () => {
    if (isTabBution) {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      try {
        const requestUrl = `${ApiUrl.getVideoSubCategoryInsideNEWINSIDEApi}?subSubCategoryId=${isTabBution}`;
        const response = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('Response...:', response);
        setRightvideosGallary(response.data?.videos || []);
      } catch (err) {
        console.error('Error fetching video data:', err);
        if (err.response) {
          console.error('Error response:', err.response);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      ToastCom({type: 'error', text2: 'Something went wrong'});
    }
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
          {item?.subSubCategoryName}
          {`\n`}
          {item?.subSubCategoryShortDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{paddingHorizontal: wp(2), marginBottom: hp(25)}}>
      <View
        style={{
          marginVertical: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <GoBackBtnCom />
        <Text style={styles.todatNewTxt}>{t('VideoGallery')}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={videosSubCatogaryInside}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          removeClippedSubviews={false}
          ListEmptyComponent={() => (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
        />
        {isLoading ? (
          <View style={{width: '80%'}}>
            <LoaderCom />
          </View>
        ) : (
          <VerticalBigList dataa={videosRightGallary} />
        )}
      </View>
    </View>
  );
};

export default HomeYoutubVideosInsideNewAddCom;

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
  contentTime: {
    color: Colors.BlackOpacity,
    fontSize: hp(1.9),
    fontFamily: Fonts.PoppinsMedium500,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  btnWatchNow: {
    paddingVertical: wp(1),
    color: Colors.Primary,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2),
  },
  flatListContainer: {
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  cardContainerBig: {
    width: wp(40),
  },
  cardImgContainerBig: {
    width: wp(30),
    height: hp(15),
  },
  cardContentContainerBig: {
    width: wp(30),
    paddingHorizontal: wp(1),
  },
  cardContentTitleBig: {
    fontSize: hp(1.5),
    fontFamily: Fonts.InterBold700,
  },
  cardContentTitleBigPara: {
    fontSize: hp(1.3),
    color: Colors.Gray,
  },
});

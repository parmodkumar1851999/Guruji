import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import FastImage from 'react-native-fast-image';
import ImagePath from '../../Constants/ImagePath';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import ButtonCom from '../../Components/ButtonCom';
import ScreensName from '../../Navigations/ScreensName';
import {t} from 'i18next';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob from 'react-native-blob-util';
import LoaderCom from '../../Components/LoaderCom';
import mime from 'react-native-mime-types';
import {ToastCom} from '../../Components/ToastCom';
import GoBackBtnCom from '../../Components/GoBackBtnCom';

const HomeBookDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {data} = route?.params;
  // console.log('parmod...', data?.bookLink);
  // const url = 'https://gbihr.org/images/docs/test.pdf';
  const downloadPdf = async () => {
    setLoading(true);
    const {config, fs} = RNFetchBlob;
    const download = fs.dirs?.DownloadDir;
    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: download + '/' + `Guruji${Math.random()}` + '.pdf',
      },
    })
      .fetch('GET', data?.bookLink)
      .then(res => {
        // console.log(res?.data)
        alert(' Pdf Download Successfully ');
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const _checkDataType = () => {
    const dataType = data?.bookLink;
    const fileExtension = dataType.split('.').pop().toLowerCase();
    const mimeType = mime.lookup(fileExtension);
    if (mimeType) {
      ToastCom({type: 'success', text2: 'Sucessfull go the pdf'});
      navigation.navigate(ScreensName.BOOKREAD, {viewPdf: data?.bookLink});
    } else {
      ToastCom({
        type: 'error',
        text2: "This file is not a Pdf Format we can't Open this file .",
      });
    }
  };
  return (
    <AppWapper>
      <View style={{height: '100%'}}>
         <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',  
              marginLeft:wp(2),
              paddingVertical:hp(2)
            }}>
            <GoBackBtnCom />
            <Text
              style={[
                styles.bookTitle,
                {textAlign: 'center', color: Colors.Primary,flex:.9},
              ]}>
              {t('BookDetails')}
            </Text>
          </View>
        <View style={[styles.cardImgContainer, {alignItems: 'center'}]}>
          {data?.uploadedfile ? (
            <FastImage
              source={{uri: data?.uploadedfile}}
              style={styles.cardImg}
              resizeMode="cover"
            />
          ) : (
            <View style={{width: '100%', height: '100%', marginTop: hp(-5)}}>
              <FastImage
                source={ImagePath.ErrorHandel}
                style={[styles.cardImg]}
                resizeMode="contain"
              />
              <Text style={{textAlign: 'center', marginTop: hp(-10)}}>
                No Image Found.
              </Text>
            </View>
          )}
        </View>
        <ScrollView style={styles.contentContianer}>
          <Text style={styles.bookTitle}>{data?.bookName}</Text>
          {/* <Text style={styles.bookAuthor}>by Matt RIDLEY</Text> */}
          <Text style={[styles.bookTitle, styles.bookPara]}>
            {data?.bookDescription}
          </Text>
        </ScrollView>
        {loading ? (
          <LoaderCom />
        ) : (
          <View style={styles.buttonContianer}>
            <ButtonCom
              label={t('Read')}
              propsContainer={styles.btnStyle}
              propsLabel={styles.lebalStyle}
              // onPress={() => navigation.navigate(ScreensName.BOOKREAD,{viewPdf:data?.bookLink})}
              onPress={() => _checkDataType()}
            />

            <ButtonCom
              label={t('Download')}
              propsContainer={styles.btnStyle}
              propsLabel={styles.lebalStyle}
              onPress={() => downloadPdf()}
            />
          </View>
        )}
      </View>
    </AppWapper>
  );
};

export default HomeBookDetails;
const styles = StyleSheet.create({
  cardImgContainer: {
    width: wp(50),
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
  buttonContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(0),
    height: hp(10),
    width: '100%',

    backgroundColor: Colors.White,
  },
  btnStyle: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  lebalStyle: {
    color: Colors.Primary,
  },
});

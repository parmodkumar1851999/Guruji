import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import Colors from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import ImagePath from '../../Constants/ImagePath';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import VectorIcon from '../../Constants/VectorIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputCom from '../../Components/InputCom';
import Fonts from '../../Constants/Fonts';
import ButtonCom from '../../Components/ButtonCom';
import LoaderCom from '../../Components/LoaderCom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../Utils/apiurl';
import {ToastCom} from '../../Components/ToastCom';

const ProfileUpdate = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [FullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getUserDOB, setUserDOB] = useState('');

  // ************** if anybuddy want to use this code copy to here.. developer Parmod Kumar ultra_parmod on instagram Start ****************
  // Function to choose image source (Gallery or Camera)
  const chooseImageSource = () => {
    Alert.alert(
      'Select Image Source',
      'Choose an image from gallery or take a photo.',
      [
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };
  // Open Image Picker for Gallery
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path); // Save the image URI
        console.log('Gallery image:', image.path);
      })
      .catch(error => {
        console.log('Gallery selection error: ', error);
      });
  };
  // Open Camera to take a photo
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path); // Save the captured image URI
        console.log('Camera image:', image.path);
      })
      .catch(error => {
        console.log('Camera error: ', error);
      });
  };
  // ************** if anybuddy want to use this code copy to here.. developer Parmod Kumar ultra_parmod on instagram End ****************
  // Function to update the image using an API call

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    const dateOfBirth = extractDate(date.toISOString());
    if (FullName || dateOfBirth || imageUri) {
      const formData = new FormData();
      if (FullName) {
        formData.append('fullName', FullName);
      }
      if (dateOfBirth) {
        formData.append('dob', dateOfBirth);
      }
      if (imageUri) {
        formData.append('uploadedFile', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      try {
        let token = await AsyncStorage.getItem('token').catch(err =>
          console.log(err),
        );
        const response = await axios.put(
          ApiUrl.userupdateProfileApi,
          formData,
          {
            headers: {
              Accept: 'multipart/form-data',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
              token: token,
            },
          },
        );
        // console.log('Profile updated successfully:', response?.data);
        navigation.goBack();
        ToastCom({type: 'Success', text2: response?.data?.message});
      } catch (err) {
        // console.error('Error updating profile:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('No data provided to update the profile.');
      setIsLoading(false); // Hide loading indicator
    }
  };
  // ************ APi work Start************

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
      const response = await fetch(ApiUrl.userGetDetailsApi, {
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
      // console.log('register success...', result?.data?.uploadedFile);
      setFullName(result?.data?.fullName);
      setMobileNo(result?.data?.mobile);
      setEmail(result?.data?.email);
      setUserDOB(result?.data?.dob);
      setImageUri(result?.data?.uploadedFile);
      ToastCom({type: 'Success', text2: result?.message});
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      ToastCom({type: 'error', text2: result?.message});
    }
  };


  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 0);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const extractDate = isoString => {
    if (isoString) {
      const [year, month, day] = isoString.split('T')[0].split('-');
      return `${day}-${month}-${year}`;
    } else {
      console.error('Date Of Birth Not Selected');
      return null;
    }
  };
  //   if (date) {
  //     console.log('Ui Show Date Of Birth  : ', format(date, 'dd-MM-yyyy'));
  //     console.log('Send backend Date Of Birth : ', date);
  //   } else {
  //     console.error('Date Of Birth Not Selected ');
  //   }
  return (
    <AppWapper>
      <KeyboardAwareScrollView
        extraHeight={200}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={ImagePath.OfferBgImg}
          style={styles.backgroundImgContianer}>
          <HeaderCom
            type={'Ionicons'}
            name={'chevron-back'}
            onPress={() => navigation.goBack()}
            labelCenter={t('Profile')}
            propsContainer={{backgroundColor: null}}
          />
          <View style={styles.imgTxtContainer}>
            {imageUri ? (
              <TouchableOpacity onPress={() => chooseImageSource()}>
                <FastImage source={{uri: imageUri}} style={styles.vactorIcon} />
              </TouchableOpacity>
            ) : (
              <VectorIcon
                type={'FontAwesome'}
                name={'user-circle-o'}
                color={Colors.Gray}
                size={126}
                style={styles.vactorIcon}
                onPress={() => chooseImageSource()}
              />
            )}
            <VectorIcon
              type={'Entypo'}
              name={'edit'}
              color={Colors.Primary}
              size={20}
              style={styles.vactorIconEdit}
              onPress={() => chooseImageSource()}
            />
          </View>
        </ImageBackground>

        <View style={{paddingHorizontal: wp(4)}}>
          <Text style={[styles.mobileTxt, {marginTop: hp(3)}]}>
            {t('FullName')}
          </Text>
          <InputCom
            placeholder={t('EnterFullName')}
            keyboardType={'email-address'}
            value={FullName}
            onChangeText={txt => setFullName(txt)}
          />
          <Text style={styles.mobileTxt}>{t('MobileNumber')}</Text>
          <InputCom
            placeholder={t('MobilePlaceholder')}
            keyboardType={'number-pad'}
            secureTextEntry={false}
            maxLength={10}
            value={mobileNo}
            editable={false}
            onPress={() =>
              ToastCom({
                type: 'error',
                text2: `You can't update your Mobile No.`,
              })
            }
            onChangeText={txt => setMobileNo(txt)}
          />
          <Text style={styles.mobileTxt}>{t('Email')}</Text>
          <InputCom
            placeholder={t('ExamEmail')}
            keyboardType={'email-address'}
            value={email}
            editable={false}
            onPress={() =>
              ToastCom({type: 'error', text2: `You can't update your Gmail.`})
            }
            onChangeText={txt => setEmail(txt)}
          />
          <Text style={styles.mobileTxt}>{t('DateOfBirth')}</Text>
          <View
            style={[
              styles.passwordContiaer,
              {
                borderColor: !date ? Colors.ExtraLightGray : Colors.Primary,
                alignItems: 'center',
              },
            ]}>
            {/* DateTimePicker Start   */}
            {show && (
              <DateTimePicker
                // minimumDate={new Date()}
                maximumDate={eighteenYearsAgo}
                testID="dateTimePicker"
                value={date || eighteenYearsAgo}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShow(true)}
              style={styles.btnDateOfBirth}>
              {date ? (
                <Text
                  style={[
                    styles.btnDateOfBirthTxt,
                    {color: date ? Colors.Primary : Colors.Gray},
                  ]}>
                  {/* {format(date, 'dd-MM-yyyy')} */}
                  {extractDate(date.toISOString())}
                </Text>
              ) : (
                <Text
                  style={[styles.btnDateOfBirthTxt, {color: Colors.Primary}]}>
                  {/* {'DD / MM /YYY'} */}
                  {getUserDOB}
                </Text>
              )}
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShow(true)}>
                {date ? (
                  <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name={'calendar'}
                    size={22}
                    color={Colors.Primary}
                  />
                ) : (
                  <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name={'calendar'}
                    size={22}
                    color={Colors.Gray}
                  />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
            {/* DateTimePicker End   */}
          </View>
          {/* isLoading */}
          {isLoading ? (
            <LoaderCom />
          ) : (
            <View style={{alignSelf: 'center', marginVertical: hp(4)}}>
              <ButtonCom
                disabled={FullName && imageUri && date ? false : true}
                propsContainer={{
                  backgroundColor:
                    FullName && imageUri && date ? Colors.Primary : Colors.Gray,
                }}
                label={t('UpdateProfile')}
                onPress={() => handleProfileUpdate()}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </AppWapper>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
  backgroundImgContianer: {
    width: '100%',
    height: hp(30),
  },
  imgTxtContainer: {
    justifyContent: 'center',
    flex: 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  vactorIcon: {
    height: wp(35),
    width: wp(35),
    borderRadius: wp(35),
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vactorIconEdit: {
    position: 'relative',
    top: hp(7),
    left: wp(-12),
    padding: wp(1.2),
    height: wp(8),
    width: wp(8),
    borderRadius: wp(8),
    backgroundColor: Colors.White,
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: wp(1),
  },
  btnDateOfBirth: {
    backgroundColor: Colors.lightSkyblue,
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp(2),
    justifyContent: 'space-between',
    padding: wp(3),
  },
  btnDateOfBirthTxt: {
    fontSize: hp(1.9),
    fontFamily: Fonts.PoppinsMedium500,
  },
});

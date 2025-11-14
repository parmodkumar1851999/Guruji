import {
  FlatList,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWapper from '../../Components/AppWapper';
import StatusBarCom from '../../Components/StatusBarCom';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import ImagePath from '../../Constants/ImagePath';
import Colors from '../../Constants/Colors';
import VectorIcon from '../../Constants/VectorIcon';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import ButtonCom from '../../Components/ButtonCom';
import Collapsible from 'react-native-collapsible';
import ModalCom from '../../Components/ModalCom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputCom from '../../Components/InputCom';
import {ToastCom} from '../../Components/ToastCom';
import {APIRequest, ApiUrl} from '../../Utils/apiurl';
import LoaderCom from '../../Components/LoaderCom';


const HelpCenter = ({navigation}) => {
  const tabsData = [
    {
      id: 0,
      name: `${t('Faq')}`,
    },
    {
      id: 1,
      name: `${t('Chat')}`,
    },
  ];
  const tabsDataContant = [
    {
      id: 0,
      QTitle:`${t('HelpQue01')}`,
      QParaTitle:`${t('HelpPara01')}`,
    },
    {
      id: 1,
      QTitle:`${t('HelpQue02')}`,
      QParaTitle:`${t('HelpPara02')}`,
    },
    {
      id: 2,
      QTitle:`${t('HelpQue03')}`,
      QParaTitle:`${t('HelpPara03')}`,
    },
    {
      id: 3,
      QTitle:`${t('HelpQue04')}`,
      QParaTitle:`${t('HelpPara04')}`,
    },
    {
      id: 4,
      QTitle:`${t('HelpQue05')}`,
      QParaTitle:`${t('HelpPara05')}`,
    },
  ];
  const [isTabBution, setIsTabButton] = useState([0]);
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [des, setDes] = useState('');
  const [loading, setLoading] = useState(false);
  const [collapsedStates, setCollapsedStates] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const toggleCollapse = item => {
    setCollapsedStates(prevState => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const _help = async () => {
    if (validateEmail(email)) {
      setLoading(true);
      let config = {
        url: `${ApiUrl.helpApi}`,
        method: 'post',
        body: {
          mobile: mobileNo,
          email: email,
          description: des,
        },
      };
      await APIRequest(
        config,
        res => {
          ToastCom({type: 'success', text2: res?.message});
          setLoading(false);
          setMobileNo('');
          setEmail('');
          setDes('');
        },
        err => {
          console.log(err?.message, '---err');
          setLoading(false);
          if (err?.message) {
            ToastCom({type: 'error', text2: err?.message});
          }
        },
      );
    } else {
      ToastCom({type: 'error', text2: 'Please Enter Valid Email Address'});
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={{alignSelf: 'center'}} key={index}>
        <TouchableOpacity
          onPress={() => {
            setIsTabButton(index);
          }}
          activeOpacity={0.7}
          style={[
            styles.tabBtnContainer,
            {
              borderColor:
                isTabBution == index ? Colors.Primary : Colors.Primary,
              backgroundColor:
                isTabBution == index ? Colors.Primary : Colors.White,
            },
          ]}>
          <Text
            style={[
              styles.tabBtnContainerText,
              {
                color: isTabBution == index ? Colors.White : Colors.Black,
              },
            ]}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <AppWapper>
      <StatusBarCom />
      <ImageBackground
        source={ImagePath.OfferBgImg}
        style={styles.backgroundImgContianer}>
        <HeaderCom
          type={'Ionicons'}
          name={'chevron-back'}
          onPress={() => navigation.goBack()}
          labelCenter={t('HelpCenter')}
          propsContainer={{backgroundColor: null}}
        />
        <Text style={styles.helpYouTitle}>{t('howCaHelpYou')}</Text>
      </ImageBackground>
      <View style={styles.contianerInner}>
        <FlatList
          data={tabsData}
          renderItem={renderItem}
          // keyExtractor={item => item.id}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false} // <- Add This
        />
        {isTabBution == 0 ? (
          <View style={{paddingBottom: hp(10)}}>
            {tabsDataContant.map(item => (
              <View key={item.id} style={styles.collapsedContianer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleCollapse(item.id)}
                  style={styles.collapsedBtnContianer}>
                  <Text style={styles.QTitle}>{item?.QTitle}</Text>
                  {/*... rest of your code */}
                  {collapsedStates[item.id] ? (
                    <VectorIcon
                      type={'Ionicons'}
                      name={'chevron-back'}
                      color={Colors.White}
                      size={35}
                      style={{transform: [{rotate: '270deg'}]}}
                    />
                  ) : (
                    <VectorIcon
                      type={'Ionicons'}
                      name={'chevron-back'}
                      color={Colors.White}
                      size={35}
                      style={{transform: [{rotate: '90deg'}]}}
                    />
                  )}
                </TouchableOpacity>
                <Collapsible collapsed={collapsedStates[item.id]}>
                  <ScrollView style={styles.collapsedInnerDataContianer}>
                    <Text style={styles.collapsedInnerDataTitle}>
                      {item?.QParaTitle}
                    </Text>
                  </ScrollView>
                </Collapsible>
              </View>
            ))}
          </View>
        ) : null}
        {isTabBution == 1 ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{t('NeedHelp')}</Text>
              <Text
                style={[
                  styles.modalTitle,
                  {color: Colors.Black, fontSize: hp(2)},
                ]}>
                {t('Email')}: <Text
                            onPress={() => {
                              Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                                console.error('Failed to open email client', err),
                              );
                            }}
                            style={[
                              styles.policyPara,
                              
                              {color: 'blue',fontSize:hp(1.9)},
                            ]}>kathasaartv@gmail.com
                          </Text>
              </Text>

              <Text style={styles.mobileTxt}>{t('MobileNumber')}</Text>
              <InputCom
                placeholder={t('MobilePlaceholder')}
                keyboardType={'number-pad'}
                secureTextEntry={false}
                maxLength={10}
                value={mobileNo}
                onChangeText={txt => setMobileNo(txt)}
              />
              <Text style={styles.mobileTxt}>{t('Email')}</Text>
              <InputCom
                placeholder={t('ExamEmail')}
                keyboardType={'email-address'}
                value={email}
                onChangeText={txt => setEmail(txt)}
              />
              <Text style={styles.mobileTxt}>{t('Description')}</Text>
              <InputCom
                placeholder={t('Des..')}
                // keyboardType={'email-address'}
                value={des}
                onChangeText={txt => setDes(txt)}
                numberOfLines={4}
                propscontianer={{height: hp(10)}}
                propsInput={{height: hp(10), textAlignVertical: 'top'}}
              />
              {loading ? (
                <LoaderCom />
              ) : (
                <View style={{alignSelf: 'center', marginVertical: hp(4)}}>
                  <ButtonCom
                    label={t('Send')}
                    disabled={
                      mobileNo.length > 9 && email && des ? false : true
                    }
                    propsContainer={{
                      backgroundColor:
                        mobileNo.length > 9 && email && des
                          ? Colors.Primary
                          : Colors.Gray,
                    }}
                    onPress={() => _help()}
                  />
                </View>
              )}
            </View>
            <Text style={{height: hp(60)}} />
          </ScrollView>
        ) : null}
      </View>
    </AppWapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  backgroundImgContianer: {
    width: '100%',
    height: hp(20),
  },
  helpYouTitle: {
    color: Colors.White,
    fontFamily: Fonts.InterMedium500,
    textTransform: 'capitalize',
    fontSize: hp(2.5),
    textAlign: 'center',
    marginTop: hp(2),
  },
  contianerInner: {
    paddingHorizontal: wp(4),
    marginTop: hp(4),
  },
  collapsedContianer: {
    marginTop: hp(2),
  },
  collapsedBtnContianer: {
    flexDirection: 'row',
    backgroundColor: Colors.Primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingLeft: wp(4),
    paddingVertical: wp(1.5),
    borderRadius: wp(10),
  },
  collapsedInnerDataContianer: {
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    marginTop: hp(2),
    height: hp(20),
  },
  QTitle: {
    color: Colors.White,
    textTransform: 'capitalize',
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.1),
  },
  collapsedInnerDataTitle: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.98),
    textTransform: 'capitalize',
    textAlign: 'justify',
  },
  modalTitle: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(3),
    textAlign: 'center',
    marginBottom: hp(2),
  },
  mobileTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    textTransform: 'capitalize',
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: wp(1),
  },
  //   importent
  footer: {
    // height: hp(10),
    // paddingVertical: hp(10),
  },
  tabBtnContainer: {
    borderWidth: wp(0.3),
    marginRight: wp(5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.8),
    backgroundColor: Colors.Primary,
    borderRadius: wp(50),
    width: wp(43.5),
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  tabBtnContainerText: {
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.2),
  },
});

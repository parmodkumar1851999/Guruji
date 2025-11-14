import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PrivacyPolicy = ({navigation}) => {
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('PrivacyPolicy')}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contianer}>
        <Text style={styles.policyTitle}>{t('PrivacyPolicy')}</Text>
        <Text style={[styles.policyPara, {fontWeight: '700'}]}>
          {t('LastUpdatedPolicTerm')}
        </Text>
        <Text style={[styles.policyPara, {marginBottom: hp(2)}]}>
          {t('WelcomeTo')}
        </Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('GurujiAppisdesigned')}
        </Text>
        <Text style={styles.policyTitle}>{t('InformationWeCollect')}</Text>
        <Text style={styles.policyPara}>{t('WeCollectTheFollowing')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          <Text style={[styles.policyPara, styles.countNo]}>1.</Text>
          {t('PersonalInformation')}
        </Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          <Text style={[styles.policyPara, styles.countNo]}>2.</Text>
          {t('NonPersonal')}
        </Text>
        <Text style={styles.policyTitle}>{t('HowWeUseYourInformation')}</Text>
        <Text style={styles.policyPara}>{t('TheCollectedInformation')}</Text>

        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('Providing')}
        </Text>

        <Text style={styles.policyTitle}>{t('DataSharingDisclosure')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('WedoNotSell')}
        </Text>

        <Text style={styles.policyTitle}>{t('SecurityMeasures')}</Text>
        <Text style={styles.policyPara}>{t('WeTakeStrongMeasures')}</Text>
        <Text style={styles.policyTitle}>{t('UserRightsControls')}</Text>
        <Text style={styles.policyPara}>
          {t('UsersCanAccess')}{' '}
          <Text
            onPress={() => {
              Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                console.error('Failed to open email client', err),
              );
            }}
            style={[
              styles.policyPara,
              {color: 'blue', textDecorationLine: 'underline'},
            ]}>
            kathasaartv@gmail.com
          </Text>{' '}
        </Text>
        <Text style={styles.policyTitle}>{t('ThirdPartyServices')}</Text>
        <Text style={styles.policyPara}>{t('VideosAreCollection')}</Text>
        <Text style={styles.policyTitle}>{t('ChildrenPrivacy')}</Text>
        <Text style={styles.policyPara}>{t('GurujiAppIsNot')}</Text>
        <Text style={styles.policyTitle}>{t('ChangesToPrivacyPolicy')}</Text>
        <Text style={styles.policyPara}>{t('WeMayUpdateThisPolicy')}</Text>

        <Text style={styles.policyTitle}>{t('ContactInformation')}</Text>
        <Text style={styles.policyPara}>
          {t('IfYouhaveAnyQuestions')}{' '}
          <Text
            onPress={() => {
              Linking.openURL(`mailto:kathasaartv@gmail.com`).catch(err =>
                console.error('Failed to open email client', err),
              );
            }}
            style={[
              styles.policyPara,
              {color: 'blue', textDecorationLine: 'underline'},
            ]}>
            kathasaartv@gmail.com
          </Text>
        </Text>
        <Text style={styles.footer} />
      </ScrollView>
    </AppWapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: wp(4),
  },
  policyTitle: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.6),
    marginVertical: hp(2),
    textTransform: 'capitalize',
  },
  policyPara: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.6),
    marginVertical: hp(0),
  },
  countNo: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2),
  },
  footer: {
    backgroundColor: Colors.White,
    width: '100%',
    height: hp(10),
  },
});

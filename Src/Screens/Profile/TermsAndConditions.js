import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppWapper from '../../Components/AppWapper';
import HeaderCom from '../../Components/HeaderCom';
import {t} from 'i18next';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TermsAndConditions = ({navigation}) => {
  return (
    <AppWapper>
      <HeaderCom
        type={'Ionicons'}
        name={'chevron-back'}
        onPress={() => navigation.goBack()}
        labelCenter={t('TermsAndConditions')}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contianer}>
        <Text style={styles.policyTitle}>{t('TermsAndConditions')}</Text>
        <Text style={[styles.policyPara, {fontWeight: '700'}]}>
          {t('LastUpdatedPolicTerm')}
        </Text>
        <Text style={styles.policyPara}>
          {t('WelcomeConditionsIsImportant')}{' '}
        </Text>
        <Text style={styles.policyTitle}>{t('AcceptanceofTerms')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('ByDownloadingInstalling')}
        </Text>
        <Text style={styles.policyTitle}>{t('PurposeApp')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('GurujiProvideVideos')}
        </Text>

        <Text style={styles.policyTitle}>
          {t('UserRegistrationResponsibilities')}
        </Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('UsersMayRequired')}
        </Text>

        <Text style={styles.policyTitle}>{t('PrivacyPolicy')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('YourUseOf')}
        </Text>

        <Text style={styles.policyTitle}>
          {t('IntellectualPropertyRights')}
        </Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('AllContent')}
        </Text>

        <Text style={styles.policyTitle}>{t('ProhibitedActivities')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('UsersMustNot')}
        </Text>

        <Text style={styles.policyTitle}>{t('ContentThirdPartyLinks')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('TheAppContainLinks')}
        </Text>

        <Text style={styles.policyTitle}>{t('NotificationsUpdates')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('ByUsingYouConsent')}
        </Text>

        <Text style={styles.policyTitle}>{t('LimitationOfLiability')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('WeStriveToProvide')}
        </Text>

        <Text style={styles.policyTitle}>{t('TerminationofAccess')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('WeReserveTheRight')}
        </Text>

        <Text style={styles.policyTitle}>{t('ChangesToTermsConditions')}</Text>
        <Text style={[styles.policyTitle, styles.policyPara]}>
          {t('WeMayUpdate')}
        </Text>

        <Text style={styles.policyTitle}>{t('ContactInformation')}</Text>
        <Text style={styles.policyPara}>
          {t('ForAnyQuestions')}:{' '}
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

export default TermsAndConditions;

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

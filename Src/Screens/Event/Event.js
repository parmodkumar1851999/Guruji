import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppWapper from '../../Components/AppWapper';
import {hp, wp} from '../../Constants/Responsive';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
import HomeEnventCom from '../../Components/HomeEnventCom';
import {t} from 'i18next';
const Event = () => {
  return (
    <AppWapper>
      <View style={{paddingHorizontal: wp(4)}}>
        <Text style={styles.eventListing}>{t('EventListing')}</Text>
        <HomeEnventCom />
      </View>
    </AppWapper>
  );
};
export default Event;
const styles = StyleSheet.create({
  eventListing: {
    color: Colors.Primary,
    fontSize: hp(2.5),
    fontFamily: Fonts.InterBold700,
    marginVertical: hp(2),
  },
});

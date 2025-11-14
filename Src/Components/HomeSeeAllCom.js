import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import {t} from 'i18next';

const HomeSeeAllCom = ({onPress,Title,TitlePara}) => {
  return (
    <View style={styles.todayAndSeeAllContainer}>
      <View style={{marginLeft: wp(1)}}>
        <Text style={styles.todatNewTxt}>{Title}</Text>
                <Text style={[styles.todatNewTxt, styles.bestTodayTxt]}>
          {TitlePara}
        </Text>
      </View>
      <Text onPress={onPress} style={styles.seeAllBtn}>
        {t('Seeall')}
      </Text>
    </View>
  );
};

export default HomeSeeAllCom;

const styles = StyleSheet.create({
  todayAndSeeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todatNewTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.3),
  },
  bestTodayTxt: {
    color: Colors.Gray,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.7),
    marginTop: hp(-0.5),
  },
  seeAllBtn: {
    padding: wp(2),
    fontSize: hp(2),
    fontFamily: Fonts.InterBold700,
    color: Colors.Primary,
  },
});

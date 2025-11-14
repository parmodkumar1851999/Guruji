import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';

const styles = StyleSheet.create({
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
  flatListContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp(2.5),
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
    width: wp(46),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    padding: wp(2),
    // marginHorizontal: wp(.2),
    marginBottom: hp(2),
  },
  cardImgContainer: {
    width: wp(42),
    height: hp(15),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
    // resizeMode:'center'
  },
  cardContentContainer: {
    width: '100%',
    borderRadius: wp(2),
    paddingHorizontal: wp(1),
    marginTop: hp(1),
  },
  cardContentTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(1.9),
    textTransform: 'capitalize',
    marginBottom: hp(1),
  },
  cardContentPara: {
    color: Colors.Gray,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.5),
    textTransform: 'capitalize',
    lineHeight: hp(1.5),
  },
  footer: {
    marginBottom: hp(0),
  },
});

export default styles;

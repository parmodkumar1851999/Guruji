// styles.js
import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
  },
  imgContianer: {
    flex: 0.6,
    width: '100%',
  },
  splashImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  textContent: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  OnBoardingContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  OnBoardingTitleOne: {
    color: Colors.Primary,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(3),
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  OnBoardingParaOne: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(1.5),
    textAlign: 'center',
    textTransform: 'capitalize',
    width: wp(80),
    marginTop: hp(3),
  },
  dottedContianer: {flexDirection: 'row', alignSelf: 'center'},
  dotted: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(2.5),
    backgroundColor: Colors.Gray,
    marginTop: hp(1),
  },
  propsContainer: {
    backgroundColor: Colors.Transplant,
    marginBottom: hp(2),
    marginTop: hp(-1),
  },
  propsLabel: {color: Colors.BlackOpacity, fontSize: hp(2.2)},
});

export default styles;

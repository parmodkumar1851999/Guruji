import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
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
    width: wp(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    padding: wp(2),
    marginRight: wp(2.5),
  },
  cardImgContainer: {
    width: wp(38),
    height: hp(14),
    borderRadius: wp(2),
  },
  cardImg: {
    width: '100%',
    height: '100%',
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
    fontSize: hp(1.7),
    textTransform: 'capitalize',
    lineHeight: hp(1.6),
  },
});
export default styles;

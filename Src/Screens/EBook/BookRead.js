import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../Constants/Responsive';
import Fonts from '../../Constants/Fonts';
import Colors from '../../Constants/Colors';
import {t} from 'i18next';
import Pdf from 'react-native-pdf';

const BookRead = ({route}) => {
  const [pageCount, setPage] = useState();
  const [error, setError] = useState('Sorry There is no Pdf for View');
  const {viewPdf} = route?.params;
  // console.log('err', error);
  // console.log('daaa', viewPdf);
  // const parmod = 'https://gbihr.org/images/docs/test.pdf';
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <Text style={[styles.bookTitle, {textAlign: 'center', marginTop: hp(1)}]}>
        {t('BookDetails')}
      </Text>
      <Pdf
        trustAllCerts={false}
        source={{uri:viewPdf}}
        style={{width: '100%', height: '90%', backgroundColor: Colors.White}}
        horizontal
        enablePaging={true}
        spacing={0}
        // scale={1.5}
        // onPressLink={()=>Linking.openURL('https://gbihr.org/images/docs/test.pdf')}
        onPageChanged={(page, totalPages) => setPage(`${page}/${totalPages}`)}
        renderActivityIndicator={() => {
          <ActivityIndicator color={Colors.Primary} size={20} />;
        }}
      />
      <Text
        style={{
          color: Colors.Primary,
          marginTop: hp(-4),
          fontSize: hp(2),
          fontFamily: Fonts.InterBold700,
          width: '100%',
          textAlign: 'center',
        }}>
        {pageCount}
      </Text>
      {/* // </AppWapper> */}
    </View>
  );
};

export default BookRead;

const styles = StyleSheet.create({
  container: {marginHorizontal: wp(4), marginBottom: hp(5)},
  bookTitle: {
    color: Colors.Black,
    fontFamily: Fonts.InterBold700,
    fontSize: hp(2.5),
    textTransform: 'capitalize',
  },
  bookPara: {
    fontFamily: Fonts.PoppinsRegular400,
    color: Colors.BlackOpacity,
    textTransform: 'capitalize',
    textAlign: 'justify',
    fontSize: hp(1.9),
    lineHeight: hp(3),
  },
});

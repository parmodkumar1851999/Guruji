import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import ReactNativeModal from 'react-native-modal';
import VectorIcon from '../Constants/VectorIcon';
import Colors from '../Constants/Colors';
import { hp, wp } from '../Constants/Responsive';
import Fonts from '../Constants/Fonts';
import { t } from 'i18next';

  
  const SelectLangModal = ({visible, onClose, onSelect, selectedLang}) => {
    const [languages, setLanguages] = useState([
      {
        title: 'English',
      },
      {
        title: 'हिंदी',
      },
    ]);
    const getSelected = () => {
      let i = 0;
      languages.map((item, index) => {
        if (item.title == selectedLang) {
          i = index;
        }
      });
      return i;
    };
    const [selectedIndex, setSelectedIndex] = useState(getSelected());
    return (
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackdropPress={() => onClose()}
        isVisible={visible}
        style={styles.modalView}>
        <View style={styles.modal}>
          <Text style={styles.heading}>{t('ChosseLangauage')}</Text>
          <FlatList
            data={languages}
            removeClippedSubviews={false} // <- Add This
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setSelectedIndex(index);
                    onSelect(languages[index].title);
                  }}>
                 
                  <Text style={styles.itemTxt}>{item.title}</Text>
                  <VectorIcon
                    type={'FontAwesome6'}
                    name={'check-circle'}
                    size={20}
                    color={Colors.BlackOpacity}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    );
  };
  
  export default SelectLangModal;
  const styles = StyleSheet.create({
    modalView: {
      margin: 0,
    },
    modal: {
      width: '100%',
      paddingBottom:hp(1),
      backgroundColor:Colors.White,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius:wp(3),
      borderTopRightRadius:wp(3),
      height:hp(30)
    },
    heading: {
      fontSize:hp(2.5),
      fontFamily:Fonts.InterBold700,
      textAlign:'center',
      color:Colors.Black,
      margin:wp(4),
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginVertical:hp(1),
      justifyContent:'space-between'
    },
    itemTxt: {
    color: Colors.BlackOpacity,
    fontFamily: Fonts.PoppinsMedium500,
    fontSize: hp(2.2),
    },
  });
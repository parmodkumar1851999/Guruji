// Library
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
import * as Screen from '../Screens/Index';
import ScreensName from './ScreensName';
import ImagePath from '../Constants/ImagePath';
import {useEffect, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import Colors from '../Constants/Colors';
import { t } from 'i18next';

const BottomTab = createBottomTabNavigator();
// Varables
const WIDTH = wp(15);
const HEIGHT = hp(8);
const WIDTH_HEIGHT100 = '100%';
const ACTIVECOLOR = Colors.Primary;
const UNACTIVECOLOR =Colors.Gray;

export default BottomNavigation = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName={ScreensName.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVECOLOR,
        tabBarInactiveTintColor:UNACTIVECOLOR,
        tabBarStyle: {
          // bottom: isKeyboardVisible ? hp(-10) : 0,
          // backgroundColor:'blue'
        },
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTab.Screen
        name={ScreensName.HOME}
        component={Screen.Home}
        options={{
          tabBarLabel:`${t('Home')}`,
          tabBarLabelStyle: {
            // fontSize: fontSize,
            // position: 'absolute',
            // bottom: hp(1),
            // fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.Home}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.Home} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name={ScreensName.EVENT}
        component={Screen.Event}
        options={{
          tabBarLabel:`${t('Event')}`  ,
          tabBarLabelStyle: {
            // fontSize: fontSize,
            // position: 'absolute',
            // bottom: hp(1),
            // fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.Event}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.Event} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name={ScreensName.VIDEOS}
        component={Screen.Videos}
        options={{
          tabBarLabel: `${t('Videos')}`,
          tabBarLabelStyle: {
            // fontSize: fontSize,
            // position: 'absolute',
            // bottom: hp(1),
            // fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.Videos}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.Videos} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name={ScreensName.EBOOK}
        component={Screen.EBook}
        options={{
          tabBarLabel: `${t('EBook')}`,
          tabBarLabelStyle: {
            // fontSize: fontSize,
            // position: 'absolute',
            // bottom: hp(1),
            // fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianer}>
                <Image
                  source={ImagePath.EBook}
                  style={[style.image_Icon, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianer}>
                <Image source={ImagePath.EBook} style={style.image_Icon} />
              </View>
            ),
        }}
      />
      <BottomTab.Screen
        name={ScreensName.PROFILE}
        component={Screen.Profile}
        options={{
          tabBarLabel: `${t('Setting')}`,
          tabBarLabelStyle: {
            // fontSize: fontSize,
            // position: 'absolute',
            // bottom: hp(1),
            // fontFamily: font_Family,
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={style.image_contianerSetting}>
                <Image
                  source={ImagePath.settings}
                  style={[style.image_IconSetting, {tintColor: ACTIVECOLOR}]}
                />
              </View>
            ) : (
              <View style={style.image_contianerSetting}>
                <Image source={ImagePath.settings} style={style.image_IconSetting} />
              </View>
            ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const style = StyleSheet.create({
  image_contianer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_Icon: {
    WIDTH_HEIGHT100,
    tintColor: UNACTIVECOLOR,
  },
  image_contianerSetting:{
width: wp(10),
  },
   image_IconSetting: {
    tintColor:'gray',
 width: wp(6.2),
height: hp(3),
marginLeft:wp(1.5)
  },
});
// 
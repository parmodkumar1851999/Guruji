import React from 'react';
import ScreensName from './ScreensName';
// import {InitialScreen,Login,Signup} from '../Screens'
import * as Screen from '../Screens/Index';
import BottomNavigation from './BottomNavigation';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={ScreensName.BOTTOMNAVIGATION}
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMESEEALLTOP}
        component={Screen.HomeSeeAllTop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMESEEALLLATEST}
        component={Screen.HomeSeeAllLatest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMESEEALLTRENDING}
        component={Screen.HomeSeeAllTrending}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.EVENTFULLDETAILS}
        component={Screen.EventFullDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMEYOUTUBEVIDEOSINSIDE}
        component={Screen.HomeYoutubVideosInside}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={ScreensName.HOMEYOUTUBEVIDEOSINSIDENEWADD}
        component={Screen.HomeYoutubVideosInsideNewAdd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMEYOUTUBEVIDEOSINSIDEINNER}
        component={Screen.HomeYoutubVideosInsideInner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMEEBOOKINSIDE}
        component={Screen.HomeEBookInside}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HOMEBOOKDETAILS}
        component={Screen.HomeBookDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.BOOKREAD}
        component={Screen.BookRead}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.PROFILEUPDATE}
        component={Screen.ProfileUpdate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.PRIVACYPOLICY}
        component={Screen.PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.TERMSANDCONDITIONS}
        component={Screen.TermsAndConditions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.PASSWORDCHANGE}
        component={Screen.PasswordChange}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.FORGETPASSWORDMAINSTACK}
        component={Screen.ForgetPasswordMainStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.HELPCENTER}
        component={Screen.HelpCenter}
        options={{headerShown: false}}
      />
    </>
  );
}

import React from 'react';
import ScreensName from './ScreensName';
// import {InitialScreen,Login,Signup} from '../Screens'
import * as Screen from '../Screens/Index';

// var
const animation = 'slide_from_right';
const headerShown = false;
export default function (Stack) {
  return (
    <>
      {/* <Stack.Screen
        name={ScreensName.INITIAL_SCREEN}
        component={Screen.InitialScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name={ScreensName.ONBOARDINGONE}
        component={Screen.OnBoardingOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGTWO}
        component={Screen.OnBoardingTwo}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.ONBOARDINGTHREE}
        component={Screen.OnBoardingThree}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.LOGIN}
        component={Screen.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.LOGINEMAIL}
        component={Screen.LoginEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.REGISTERDETAILS}
        component={Screen.RegisterDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.CONGRATULATIONS}
        component={Screen.Congratulations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreensName.OTP}
        component={Screen.Otp}
        options={{animation: animation, headerShown: headerShown}}
      />
      <Stack.Screen
        name={ScreensName.FORGETPASSWORD}
        component={Screen.ForgetPassword}
        options={{animation: animation, headerShown: headerShown}}
      />
    </>
  );
}

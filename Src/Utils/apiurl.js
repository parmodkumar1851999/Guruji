import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const BASEURL = 'http://13.49.145.209:5000/api/';
// const BASEURL = 'https://guruji.bhadaapp.com/api/';
// const BASEURL = 'https://gurujee.bdrl.co.in/api/';
const BASEURL = 'https://api.shambhusharanlataji.com/api/';


// const BDRL_User = `${BASEURL}auth/`;

export const ApiUrl = {
  registerApi: `${BASEURL}user/signup/admin`,
  otpVerifyApi: `${BASEURL}user/verify`,
  loginApi: `${BASEURL}user/login`,
  loginMobileApi: `${BASEURL}user/login/mobile`,
  resendApi: `${BASEURL}user/forgot`, // i know both Api are same 
  forgotApi: `${BASEURL}user/forgot`, // i know both APi are same 
  helpApi: `${BASEURL}post/help`,
  resetApi: `${BASEURL}user/reset`,
  changePasswordApi: `${BASEURL}user/change/password`,
  userGetDetailsApi: `${BASEURL}user/get/details`,
  userupdateProfileApi: `${BASEURL}user/update/profile`,
  getAllEnventApi: `${BASEURL}get/all/event`,
  getEnventByIdApi: `${BASEURL}get/event/admin`, //Get Event By Id i called
  getHomeVideosTopApi: `${BASEURL}get/video/by/video/type/home/admin?videoType=Top`, //Get Event By Id i called
  getHomeVideosTrendingApi: `${BASEURL}get/video/by/video/type/home/admin?videoType=Trending`, //Get Event By Id i called
  getHomeVideosLatestApi: `${BASEURL}get/video/by/video/type/home/admin?videoType=Latest`, //Get Event By Id i called
  getVideoCategoryApi: `${BASEURL}get/video/category/admin`, 
  // getVideoSubCategoryApi: `${BASEURL}get/video/sub/category/admin`, 
  getVideoSubCategoryInsideApi: `${BASEURL}get/video/sub/category/admin`, 
  getVideoSubCategoryInsideNEWApi: `${BASEURL}get/video/sub/sub/category/admin`, 
  getVideoSubCategoryInsideNEWINSIDEApi: `${BASEURL}get/all/video/associated/sub/sub/category/admin`, 

  
  getVideoSubCategoryInsideVideosApi:`${BASEURL}get/all/video/associated/sub/category/admin`,
  getBookCategory:`${BASEURL}get/all/book/category/admin`,
  getBookSubCategoryApi:`${BASEURL}get/all/book/with/category`,
  getAllBannerApi:`${BASEURL}get/all/banner/admin`,
  getUpdateTokenApi:`${BASEURL}user/update/fcm/token`,

  // NEW change APi work -------------------------











  
  
  









 
};

export const APIRequest = async (
  config = {},
  onSuccess,
  onError,
  noAuth = null,
) => {
  const token = await AsyncStorage.getItem('token').catch(err =>
    console.log(err),
  );
  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // token: token
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
    axios(data)
      .then(res => {
        if (!res.data.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        console.log(err);
        onError(err?.response?.data ? err?.response?.data : err?.response);
      });
  } catch (error) {
    console.log('error', error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  // const token = new User().getToken();
  const token = await AsyncStorage.getItem('token').catch(err =>
    console.log(err),
  );

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    axios(data)
      .then(res => {
        // if (res.status == 200 || res.status == 201) {
        //   console.log(res.data);
        //   onSuccess(res.data);
        // }
        // console.log("asdas",res);

        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};








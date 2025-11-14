import axios from 'axios';
import Config from '../Constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postApi = async (EndPoint, body) => {
  try {
    let isFormData = body instanceof FormData;
    let authToken = await AsyncStorage.getItem('authKey');
    let response = await axios.post(Config.BaseUrl + EndPoint, body, {
      headers: {
        authKey: authToken,
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// export const postNewApi = async ({body}) => {
//   try {
//     let isFormData = body instanceof FormData;
//     // console.log('body  is here ..', body);
//     let authToken = await AsyncStorage.getItem('authKey');
//     let response = await axios.post(Config.BaseUrlNew, body, {
//       headers: {
//         cuckoo: '0b3723ad37e739699dba1ce8d076d8ea',
//         'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
//       },
//     });

//     return response.data;
//   } catch (error) {}
// };
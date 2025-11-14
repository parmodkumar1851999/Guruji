import { apiPost } from '../../Utils/AxiosHandle'
import { saveUserData } from '../Reducers/auth'

import store from '../store'
import types from '../types'
const {dispatch}=store


export const login=(data)=>{
  dispatch(saveUserData(data))
}

export const userSignup=(data)=>{
    return apiPost('https://newapi.sndigitech.in/api/user/signup/admin',data) //ther is past your api end remove tthis

}

export function logout(){
  dispatch({type:types.CLEAR_REDUX_STATE})
}
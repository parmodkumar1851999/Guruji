import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLogin} from '../redux/Slice/LoginSlice';
import {Text} from 'react-native';
import InitialScreen from '../Screens/InitialScreen/InitialScreen';
import {setIsLocal} from '../redux/Slice/LocalSlice';

const Stack = createNativeStackNavigator();
export default function Routes() {
  const [loarding, setloarding] = React.useState(true);
  const dispatch = useDispatch();
  const isLogIn = useSelector(state => state.isLogin?.isLogin);
  console.log('isLogIn With Api', isLogIn);
  const isLocal = useSelector(state => state.isLocal?.isLocal);
  console.log('isLocal Login ', isLocal);

  //*************** function local Login and login with api start ***************
  const GetToken = async () => {
    const token = await AsyncStorage.getItem('token').catch(err =>
      console.log(err, '----- token err'),
    );
    console.log('token@', token);
    if (token) {
      dispatch(setLogin(true));
    }
  };
  React.useEffect(() => {
    GetToken();
    setTimeout(() => {
      setloarding(false);
    }, 6000);
  }, []);
  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLocal = await AsyncStorage.getItem('isLocal');
        if (isLocal === 'true') {
          dispatch(setIsLocal(true));
        } else {
          dispatch(setIsLocal(false));
        }
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
      }
    };
    checkLoginStatus();
  }, [dispatch]);
  //*************** function local Login and login with api End ***************

  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
      {/* {
                    userData?.isLogin?<>{MainStack}</>
                    :
                    <>{AuthStack(Stack,isFirstTime)}</>
                } */}

      {/* {!!userData?.isLogin?MainStack(Stack):AuthStack(Stack)} */}
      {loarding ? (
        <>
          <InitialScreen />
        </>
      ) : (
        <Stack.Navigator>
          <>{isLocal || isLogIn ? MainStack(Stack) : AuthStack(Stack)}</>
        </Stack.Navigator>
      )}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}

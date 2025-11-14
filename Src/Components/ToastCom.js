import Toast from 'react-native-toast-message';
const data = {
  warning: {
    type: 'error',
    text1: 'Warning',
  },
  error: {
    type: 'error',
    text1: 'Error',
  },
  success: {
    type: 'success',
    text1: 'Success',
  },
  info: {
    type: 'info',
    text1: 'Info',
  },
};

export const ToastCom = ({
  type = 'success',
  text2 = 'This is some something 👋',
}) => {
  const toastData = data[type] || data['success'];
  Toast.show({
    type: toastData.type,
    text1: toastData.text1,
    text2: text2,
  });
};

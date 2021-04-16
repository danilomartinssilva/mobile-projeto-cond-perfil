import Toast from 'react-native-simple-toast';

const toaster = (message) => {
  Toast.show(message, Toast.SHORT);
};

export default toaster;

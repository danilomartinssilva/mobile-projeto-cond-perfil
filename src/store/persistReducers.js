import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'app-perfil',
      storage: AsyncStorage,
      whitelist: ['auth', 'profile'],
    },
    reducers,
  );

  return persistedReducer;
};

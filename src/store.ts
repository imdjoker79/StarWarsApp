import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@redux/auth/login';
import registerReducer from '@redux/auth/register';
import languageReducer, {initialStateLang, switchLang} from './redux/language';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    register: registerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const getAsyncStorage = () => {
  return async (dispatch: any) => {
    AsyncStorage.getItem('lang').then((result): any => {
      dispatch(
        switchLang(result ? JSON.parse(result as string) : initialStateLang),
      );
    });
  };
};

store.dispatch(getAsyncStorage());

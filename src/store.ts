import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import Reactotron from '@redux/config/reactotronConfig';

import languageReducer from '@redux/language';
import authReducer from '@redux/auth/login';
import registerReducer from '@redux/auth/register';
import groupReducer from '@redux/group/group';
import userReducer from '@redux/user/user';
import starshipReducer from '@redux/starship/index';

export const rootReducers = combineReducers({
  language: languageReducer,
  register: registerReducer,
  auth: authReducer,
  group: groupReducer,
  user: userReducer,
  starship: starshipReducer,
});

const middleware = [thunk];
let composed = applyMiddleware(...middleware);
const createdEnhancer = Reactotron.createEnhancer!();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
  whitelist: ['language', 'register', 'auth', 'group'],
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

if (process.env.NODE_ENV !== 'production') {
  composed = compose(applyMiddleware(...middleware), createdEnhancer);
}

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(persistedReducer, composed);

const persistor = persistStore(store);

export {store, persistor};

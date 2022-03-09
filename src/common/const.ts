import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

export const windowDimensions = Dimensions.get('window');
export const screenDimensions = Dimensions.get('screen');

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isAndroidLollipop =
  isAndroid && Platform.Version >= 21 && Platform.Version < 23;
export const isAndroid11AndHigher = isAndroid && Platform.Version >= 30;

export const windowWidth = windowDimensions.width;
export const windowHeight =
  windowDimensions.height - (!isIos ? StatusBar.currentHeight || 0 : 0);

export const screenTabInitialLayout = {height: 0, width: windowWidth};

export const pixelRatio = PixelRatio.get();

export const maxWindowDimension = Math.max(windowWidth, windowHeight);
export const minWindowDimension = Math.min(windowHeight, windowWidth);

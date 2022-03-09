import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {PlatformColorsAndroid, PlatformColorsIOS} from '@common/colors';
import {platformNativeColor} from '@helpers/colorHelpers';
import {Pages} from './constants/allPages';
import CreateGroup from '../screens/Group/CreateGroup';
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import InviteMember from '../screens/Group/InviteMember';
import GroupScreen from '../screens/Group/GroupScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HomeScreen from '../screens/Home/HomeScreen';

export function setDefaultOptions() {
  Navigation.setDefaultOptions({
    animations: {
      setRoot: {
        waitForRender: true,
      },
      setStackRoot: {
        waitForRender: true,
      },
    },
    layout: {
      componentBackgroundColor: platformNativeColor(
        PlatformColorsIOS.secondarySystemBackground,
        PlatformColorsAndroid.background,
      ),
    },
    topBar: {
      animate: true,
      drawBehind: false,
      largeTitle: {
        visible: false,
      },
      scrollEdgeAppearance: {
        active: true,
        noBorder: true,
      },
      noBorder: false,
    },
    bottomTabs: {
      animate: false,
      titleDisplayMode: 'alwaysShow',
      hideShadow: true,
      translucent: true,
      animateTabSelection: false,
      barStyle: 'default',
      preferLargeIcons: true,
      tabsAttachMode: 'afterInitialTab',
      backgroundColor: platformNativeColor(
        PlatformColorsIOS.secondarySystemBackground,
        PlatformColorsAndroid.background,
      ),
      ...Platform.select({
        android: {
          translucent: true,
          borderWidth: 1,
          borderColor: platformNativeColor(
            undefined,
            PlatformColorsAndroid.divider,
          ),
        },
      }),
    },
    bottomTab: {
      selectedTextColor: platformNativeColor(
        PlatformColorsIOS.systemBlue,
        PlatformColorsAndroid.primary,
      ),
      selectedIconColor: platformNativeColor(
        PlatformColorsIOS.systemBlue,
        PlatformColorsAndroid.primary,
      ),
      textColor: platformNativeColor(
        PlatformColorsIOS.secondaryLabel,
        PlatformColorsAndroid.secondaryText,
      ),
      iconColor: platformNativeColor(
        PlatformColorsIOS.secondaryLabel,
        PlatformColorsAndroid.secondaryText,
      ),
    },
    statusBar: {
      backgroundColor: platformNativeColor(
        undefined,
        PlatformColorsAndroid.statusbar,
      ),
      visible: true,
    },
  });
}
/**
 * Register all screen
 */
export function registerComponent() {
  if (__DEV__) {
  }

  Navigation.registerComponent(Pages.splashScreen.name, () => SplashScreen);
  Navigation.registerComponent(Pages.loginScreen.name, () => LoginScreen);
  Navigation.registerComponent(Pages.registerScreen.name, () => RegisterScreen);
  Navigation.registerComponent(Pages.createGroupScreen.name, () => CreateGroup);
  Navigation.registerComponent(
    Pages.inviteMemberScreen.name,
    () => InviteMember,
  );
  Navigation.registerComponent(Pages.homeScreen.name, () => HomeScreen);
  Navigation.registerComponent(Pages.groupScreen.name, () => GroupScreen);
  Navigation.registerComponent(Pages.profileScreen.name, () => ProfileScreen);
}

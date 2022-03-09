import {Navigation} from 'react-native-navigation';
import {SFSymbols} from '@assets/symbols/SFSymbols';

import {Pages} from './constants/allPages';
import {MainTab} from './constants/mainTab';
import {getPlatformTabsIcon} from './helpers/navigationIconHelpers';

export function setInitialRoot() {
  Navigation.setRoot({
    root: {
      component: {
        id: Pages.splashScreen.id,
        name: Pages.splashScreen.name,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
}

export function setTabsRoot(callback?: () => void) {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: Pages.mainTab.id,
        children: [
          {
            stack: {
              id: MainTab.home.id,
              children: [
                {
                  component: {
                    id: Pages.homeScreen.id,
                    name: Pages.homeScreen.name,
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Home',
                  ...getPlatformTabsIcon(
                    SFSymbols.house,
                    SFSymbols['house.fill'],
                    'home',
                  ),
                },
              },
            },
          },
          {
            stack: {
              id: MainTab.group.id,
              children: [
                {
                  component: {
                    id: Pages.groupScreen.id,
                    name: Pages.groupScreen.name,
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Group',
                  ...getPlatformTabsIcon(
                    SFSymbols.person,
                    SFSymbols['person.fill'],
                    'group',
                  ),
                },
              },
            },
          },
          {
            stack: {
              id: MainTab.profile.id,
              children: [
                {
                  component: {
                    id: Pages.profileScreen.id,
                    name: Pages.profileScreen.name,
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'You',
                  ...getPlatformTabsIcon(
                    SFSymbols.person,
                    SFSymbols['person.fill'],
                    'person-pin',
                  ),
                },
              },
            },
          },
        ],
      },
    },
  }).then(callback);
}

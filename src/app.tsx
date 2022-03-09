import {Navigation} from 'react-native-navigation';

import {registerComponent, setDefaultOptions} from '@navigators/navigation';
import {setInitialRoot} from '@navigators/roots';

export const initializeApp = () => {
  registerComponent();
  setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.dismissAllModals();
    setInitialRoot();
  });
};

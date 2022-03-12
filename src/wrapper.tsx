import React from 'react';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {store} from './store';

export function WrappedComponent(Component: any) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
    EnhancedComponent.options = Component.options;
    return <EnhancedComponent />;
  };
}

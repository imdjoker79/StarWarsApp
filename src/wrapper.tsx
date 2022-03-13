import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';

const onBeforeLift = () => {};

export function WrappedComponent(Component: any) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <PersistGate
          loading={null}
          onBeforeLift={onBeforeLift}
          persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );
    EnhancedComponent.options = Component.options;
    return <EnhancedComponent />;
  };
}

import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.configure({name: 'app_name'}).setAsyncStorageHandler!(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();

const yeOldConsoleLog = console.log;

console.log = (...args) => {
  yeOldConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

Reactotron.clear!();

export default Reactotron;

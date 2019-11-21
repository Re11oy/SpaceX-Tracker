import Reactotron from 'reactotron-react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
let scriptHostname = scriptURL.split('://')[1].split(':')[0];
Reactotron.configure({ host: scriptHostname }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

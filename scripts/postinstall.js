const cp = require('child_process');

cp.execSync(`./node_modules/react-native-maps/enable-google-maps 'ios/GoogleMaps/**'`);
cp.execSync(
  `cd node_modules/react-native-interactable && rm -rf {ios,android} && rm -rf android && rm -rf ios && ln -s lib/android . && ln -s lib/ios .`
);

const cp = require('child_process');

cp.execSync(
  `cd node_modules/react-native-interactable && rm -rf {ios,android} && rm -rf android && rm -rf ios && ln -s lib/android . && ln -s lib/ios .`
);

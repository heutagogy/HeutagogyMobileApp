# Heutagogy mobile app

## Android simulator

### Install

1. Go through https://facebook.github.io/react-native/docs/getting-started.html Choose Android and Linux.
To install Android Studio on NixOS: `nix-env -iA nixos.android-studio`
2. Open android emulator using Android Studio.
3. `npm install`
4. `npm run link`

### Run

1. `nix-shell`
2. `npm run android`
3. `npm run start` → hopefully, you should see the app inside android emulator

### Create signed APK

Doc: https://facebook.github.io/react-native/docs/signed-apk-android.html

* Follow the instruction till “Generating the release APK” and then run `npm run build-apk`.
Signed APK file can be found in `android/app/build/outputs/apk`
* To build apk and upload it to emulator run `npm run android-release`

### Tips

* Enable keyboard input in emulator manager in order to use R-R shortcut for reloading
* Open debeloper menu: `adb shell input keyevent KEYCODE_MENU`
* Use "Debug JS Remotely" to see the logs in `http://localhost:8081/debugger-ui`

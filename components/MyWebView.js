import React, {useRef, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Button,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const {CameraModule} = NativeModules;

import {launchCamera} from 'react-native-image-picker'; // Install react-native-image-picker for handling camera
const {height: screenHeight} = Dimensions.get('window');

const MyWebView = ({onCameraOpened}) => {
  const webViewRef = useRef(null);

  const injectedJavaScript = `
  (function() {
    document.querySelector("#camera_button").addEventListener('click', function() {
      window.ReactNativeWebView.postMessage('Camera Opened Without crash');
    });
  })();
  true;
`;

  useEffect(() => {
    const handleCameraOpened = () => {
      console.log('Camera opened');
    };
    DeviceEventEmitter.addListener('cameraOpened', handleCameraOpened);
    const subscription = DeviceEventEmitter.addListener(
      'cameraOpened',
      handleCameraOpened,
    );

    // Cleanup the listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const handleUrlLoading = event => {
    console.log(event, 'event----');
    const {url} = event;
    console.log('URL Loading:', url);

    if (url.startsWith('camera-intent-url-scheme')) {
      openCamera();
      return false;
    }
    return true;
  };

  const openCamera = async () => {
    // Request camera permission if needed
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        Alert.alert('Camera permission denied');
        return;
      }
    }

    // Open the camera
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });

    if (result.didCancel) {
      console.log('Camera intent cancelled.');
    } else if (result.errorCode) {
      console.log('Camera intent error:', result.errorMessage);
    } else {
      console.log('Camera intent succeeded:', result.assets);
    }
  };

  const handleMessageFromWebView = event => {
    console.log('event Recieved', event);
    // const checkCameraPermission = async () => {
    //   if (Platform.OS === 'android') {
    //     const granted = await PermissionsAndroid.check(
    //       PermissionsAndroid.PERMISSIONS.CAMERA,
    //     );
    //     if (granted) {
    //       console.log('You can use the camera');
    //     } else {
    //       console.log('Camera permission denied');
    //     }
    //     return granted;
    //   }
    //   return true; // Assume permission is granted for iOS
    // };
    onCameraOpened();
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://karthikp196.github.io/excelConverter/',
        }}
        ref={webViewRef}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleUrlLoading}
        onMessage={handleMessageFromWebView}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: screenHeight - 65,
    padding: 10,
    marginBottom: 20,
  },
  webview: {
    height: 300,
    backgroundColor: 'white',
  },
});
export default MyWebView;

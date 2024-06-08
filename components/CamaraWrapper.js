import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, AppState, Alert, Button} from 'react-native';
import MyWebView from './MyWebView';
// import CameraComp from './CameraComp';
import CameraScreen from './CameraComp';

const CameraWrapper = () => {
  const [cameraOpened, setCameraOpened] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [isAppCrashed, setAppCrash] = useState('');
  const [imageDetails, setImageDetails] = useState(false);
  const [isCamera, setCamera] = useState(false);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setCameraOpened(false);
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Cleanup the listener on unmount
    return () => {
      subscription.remove();
    };
  }, [appState]);

  const handleCameraOpened = () => {
    setCameraOpened(true);
    setCamera(true);
  };

  const handleCameraImage = img => {
    console.log(img?.uri, 'IMG');
    setCamera(false);
    setImageDetails(img);
  };
  console.log(
    cameraOpened ? 'Camera Is Opened' : 'Camera is Not Opened',
    isCamera,
  );

  console.log(imageDetails?.uri, 'imageDetails obj');

  return (
    <View style={styles.wrapperContainer}>
      {isCamera ? (
        <>
          <CameraScreen handleCameraImage={handleCameraImage} />
        </>
      ) : (
        <>
          {imageDetails?.uri && (
            <>
              <Text>{imageDetails?.uri}</Text>
              <Button
                onPress={() => setImageDetails(false)}
                title="Clear Image Data"
                color="#841584"
              />
            </>
          )}

          <MyWebView onCameraOpened={handleCameraOpened} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusText: {
    margin: 20,
    fontSize: 18,
  },
  // wrapperContainer: {
  //   flex: 1,
  // },
});

export default CameraWrapper;

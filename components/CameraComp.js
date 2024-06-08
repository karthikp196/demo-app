// CameraScreen.js
import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const {height: screenHeight} = Dimensions.get('window');

const CameraScreen = ({handleCameraImage}) => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      handleCameraImage(data);
    }
  };

  const handleClosePicture = () => {
    handleCameraImage(null);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={handleClosePicture} style={styles.cancel}>
          <Text style={styles.cancelText}> X </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.captureText}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'black',
    height: screenHeight - 65,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    height: 60,
    width: 60,
    alignSelf: 'center',
    margin: 20,
    position: 'relative',
    right: 50,
  },
  captureText: {
    fontSize: 14,
  },
  cancel: {
    backgroundColor: '#fff',
    borderRadius: 50,

    height: 40,
    width: 40,
    alignSelf: 'center',
    margin: 20,
    position: 'relative',
    right: 50,
  },
  cancelText: {
    fontSize: 22,
    lineHeight: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CameraScreen;

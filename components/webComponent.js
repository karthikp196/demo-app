import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
const {height: screenHeight} = Dimensions.get('window');
const WebComponent = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://selfserveapp.kapturecrm.com/zeptobot.html?data-supportkey=d7f2be966d5c5b0ec30af43f2a24a9a0b4e1c3783729683744&script_type=RNF&chat-for=TICKET&server-host=%22ms-noauth%22&customer_code=FY98Qfo7j2C4oxYFOgKWIQ==&iv=bc162633a3c26352',
        }}
        style={styles.webview}
        allowFileAccess={false}
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
    backgroundColor: 'blue',
  },
});

export default WebComponent;

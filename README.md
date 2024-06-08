# Demo Zepto camera APP

## Initial Setup

1. Install Node.js
2. Install yarn or npm
3. Clone the repository
4. Run `npm install` or `yarn` to install dependencies

## To Run the App Locally

1. Connect your phone locally via USB
2. Go to settings and enable developer options
3. Inside developer options, enable USB debugging
4. Run the command: `npx react-native run-android`

## Components Overview

1. **App.tsx** - Root component
2. **CameraWrapper.js** - Loads web view and camera component dynamically
3. **CameraScreen.js** - Component for camera functionality
4. **MyWebview.js** - Component which loads the web view (In Webview, `source.uri` is the place where to enter the web view URL)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVTPoXdbZRdDMrTEBE0PTHEfq2hCc5JDQ",
  authDomain: "reactnativefirst-acbf1.firebaseapp.com",
  projectId: "reactnativefirst-acbf1",
  storageBucket: "reactnativefirst-acbf1.firebasestorage.app",
  messagingSenderId: "590910846643",
  appId: "1:590910846643:web:9610e0bd5a32a4d6bd22c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;
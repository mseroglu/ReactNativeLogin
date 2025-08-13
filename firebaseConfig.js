// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Costants from "expo-constants";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Costants.expoConfig.extra.APIKEY,
  authDomain: Costants.expoConfig.extra.AUTHDOMAIN,
  projectId: Costants.expoConfig.extra.PROJECTID,
  storageBucket: Costants.expoConfig.extra.STORAGEBUCKET,
  messagingSenderId: Costants.expoConfig.extra.MESSAGINGSENDERID,
  appId: Costants.expoConfig.extra.APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

export default app;
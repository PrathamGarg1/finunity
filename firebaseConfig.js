import { initializeApp } from 'firebase/app';

import {getAuth,getReactNativePersistence,initializeAuth, setPersistence} from "firebase/auth";

import ReactNativeAsyncStorage  from '@react-native-async-storage/async-storage';
import {getFirestore,collection} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDEl-vkF1HcHB36SHvs2Q5ADothhlNtkp8",
    authDomain: "aiphoto-app.firebaseapp.com",
    projectId: "aiphoto-app",
    storageBucket: "aiphoto-app.appspot.com",
    messagingSenderId: "1062536730869",
    appId: "1:1062536730869:web:f247acf96874bc59930dbc",
    measurementId: "G-2Q4QNPHV81",
  };
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app,{persistence:getReactNativePersistence(ReactNativeAsyncStorage)});
export const db=getFirestore(app);
export const usersRef=collection(db,'users')
export const roomRef=collection(db,'rooms')

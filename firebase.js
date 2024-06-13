// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ALz9DWbE5QDmPuSvObhwb3LpWB3Ee98",
  authDomain: "uber-next-clone-live-60394.firebaseapp.com",
  projectId: "uber-next-clone-live-60394",
  storageBucket: "uber-next-clone-live-60394.appspot.com",
  messagingSenderId: "497552191870",
  appId: "1:497552191870:web:7595702e9d3e681ad7032f",
  measurementId: "G-FP5R56RWRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();
const auth =getAuth();

export {app,provider,auth}
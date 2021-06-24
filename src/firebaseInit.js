import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyCkol6Xig7zuYBz7sFJdKecB9LeAQm85xY",
    authDomain: "operativapwa.firebaseapp.com",
    projectId: "operativapwa",
    storageBucket: "operativapwa.appspot.com",
    messagingSenderId: "197005140065",
    appId: "1:197005140065:web:7dec8d2149171bb83f4a20",
    measurementId: "G-E9VN43FNN0"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
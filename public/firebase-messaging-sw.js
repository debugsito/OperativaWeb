importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAQxvw--am9Cf1OFIBbPxxsg8KAos4-Z4E",
    authDomain: "instagram-clone-curso-b090c.firebaseapp.com",
    projectId: "instagram-clone-curso-b090c",
    storageBucket: "instagram-clone-curso-b090c.appspot.com",
    messagingSenderId: "239703557689",
    appId: "1:239703557689:web:9bf6794a90a990ab352fe8",
    measurementId: "G-6MPDCSB13D"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const functions = firebase.functions();

  export { db, auth, storage, functions };
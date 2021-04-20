import firebase from "firebase"; require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAGxnB-ngbVn5tFzKgIY5J_XEtSk4_SfGU",
    authDomain: "booksanta-b6ec6.firebaseapp.com",
    projectId: "booksanta-b6ec6",
    storageBucket: "booksanta-b6ec6.appspot.com",
    messagingSenderId: "322933919376",
    appId: "1:322933919376:web:f21927866ce9b567265215"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
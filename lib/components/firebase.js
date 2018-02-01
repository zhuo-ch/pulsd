import firebase from 'firebase';
import Keys from '../../config';

const config = {
  apiKey: Keys.firebase,
  authDomain: "pulsd-89f87.firebaseapp.com",
  databaseURL: "https://pulsd-89f87.firebaseio.com",
  projectId: "pulsd-89f87",
  storageBucket: "pulsd-89f87.appspot.com",
  messagingSenderId: "771917556096"
};

firebase.initializeApp(config);

export default firebase;

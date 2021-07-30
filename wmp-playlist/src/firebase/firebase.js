// src/firebase.js
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBnh-zjogAw0dtOaHx8Q3HQznD_3OonBAs",
  authDomain: "wmp-playlist.firebaseapp.com",
  databaseURL: "https://wmp-playlist-default-rtdb.firebaseio.com",
  projectId: "wmp-playlist",
  storageBucket: "wmp-playlist.appspot.com",
  messagingSenderId: "386302016384",
  appId: "1:386302016384:web:98262e2355a4ba4d5a5f65",
  measurementId: "G-BS8L3EFT04"
};

const app = firebase.initializeApp(config);
const db = firebase.database(app);

//export default firebase;
var myUserId = "321";

export function createItem(item) {
  const dbRef = db.ref('users/' + myUserId + '/playlist/song-' + Math.round(Math.random() * 1000));
  return dbRef.set({
      ...item
  });
};

export function getItems() {
  var dbRef = db.ref('users/' + myUserId + '/playlist');

  return new Promise((resolve, reject) => {
      const onError = error => reject(error);
      const onData = snap => resolve(snap.val());

      dbRef.on("value", onData, onError);
  });
};

export function deleteItem(songId) {
  var dbRef = db.ref('users/' + myUserId + '/playlist/' + songId);
  return dbRef.remove();
};


// src/firebase.js
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBnh-zjogAw0dtOaHx8Q3HQznD_3OonBAs",
  authDomain: "wmp-playlist.firebaseapp.com",
  databaseURL: "https://wmp-playlist-default-rtdb.firebaseio.com",
  projectId: "wmp-playlist",
  storageBucket: "wmp-playlist.appspot.com",
  messagingSenderId: "386302016384",
  appId: "1:386302016384:web:98262e2355a4ba4d5a5f65",
  measurementId: "G-BS8L3EFT04",
};

const app = firebase.initializeApp(config);
const db = firebase.database(app);

//export default firebase;
var myUsername = "";

export function getUsername() {
  return myUsername;
}

export function setUsername(id) {
  myUsername = id;
}

/**
 * Function that creates a new playlistItem in firebase
 *
 * Example usage
 *  createItem(newElement).then(response => {
 *       console.log('item saved');
 *       dosomething(response.data);
 *  });
 *
 * @param {object} item - New item to store
 * @returns {Promise} - API response
 */
export function createItem(item) {
  const dbRef = db.ref(
    "users/" + myUsername + "/playlist/song-" + Math.round(Math.random() * 1000)
  );
  return dbRef.set({
    ...item,
  });
}

/**
 * Gets all playList items in firebase
 *
 * Example Usage
 *  getItems().then((querySnapshot) => {
 *       querySnapshot.forEach(function(response) {
 *           console.log(response.id, " => ", response.data());
 *       });
 *   })
 *
 * @returns {Promise}
 */
export function getItems() {
  var dbRef = db.ref("users/" + myUsername + "/playlist");

  return new Promise((resolve, reject) => {
    const onError = (error) => reject(error);
    const onData = (snap) => resolve(snap.val());

    dbRef.on("value", onData, onError);
  });
}

/**
 * Deletes a playlist item in firebase
 *
 * Example usage
 *  deleteItem('123').then(() => {
 *       console.log('item deleted');
 *  });
 *
 * @param {string} songId - ID of the song to delete
 * @returns {Promise}
 */
export function deleteItem(songId) {
  var dbRef = db.ref("users/" + myUsername + "/playlist/" + songId);
  return dbRef.remove();
}

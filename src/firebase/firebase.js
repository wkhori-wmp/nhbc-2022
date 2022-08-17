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

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
} else {
  app = firebase.app(); // if already initialized, use that one
}
const db = firebase.database(app);

/**
 * Function that creates a new playlistItem in firebase
 *
 * Example usage
 *  createItem(newElement).then(response => {
 *       console.log('item saved');
 *       dosomething(response.data);
 *  });
 *
 * @param {object} songInfo - New item to store
 * @returns {Promise} - API response
 */
export function addSong(songInfo, playlistName) {
  const dbRef = db.ref(
    "playlists/" + playlistName + "/playlist/song-" + songInfo.index
  );
  return dbRef.set({
    ...songInfo,
  });
}

export function setPlaylistUUID(playlistName, uuid) {
  const dbRef = db.ref("playlists/" + playlistName + "/uuid");
  return dbRef.set(uuid);
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
// export function getItems(playlistName) {
//   var dbRef = db.ref("playlists/" + playlistName + "/playlist");

//   return new Promise((resolve, reject) => {
//     const onError = (error) => reject(error);
//     const onData = (snap) => resolve(snap.val());

//     dbRef.on("value", onData, onError);
//   });
// }

export function getUUID(playlistName) {
  var dbRef = db.ref("playlists/" + playlistName + "/uuid");

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
export function deleteSong(songId, playlistName) {
  var dbRef = db.ref("playlists/" + playlistName + "/playlist/song-" + songId);
  return dbRef.remove();
}

export function deletePlaylist(playlist) {
  var dbRef = db.ref("playlists/" + playlist);
  return dbRef.remove();
}

/**
 * Gets all playLists in firebase
 *
 * Example Usage
 *  getPlaylists().then((querySnapshot) => {
 *       querySnapshot.forEach(function(response) {
 *           console.log(response.id, " => ", response.data());
 *       });
 *   })
 *
 * @returns {Promise}
 */
export function getPlaylists() {
  var dbRef = db.ref("playlists");

  return new Promise((resolve, reject) => {
    const onError = (error) => reject(error);
    const onData = (snap) => resolve(snap.val());

    dbRef.on("value", onData, onError);
  });
}

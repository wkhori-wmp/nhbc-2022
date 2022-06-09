import React, { createContext, useContext, useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import {
  setUUID,
  getPlaylists,
  deletePlaylist as deletePlaylistFromDB,
  getUUID,
  addSongToPlaylistFirebase,
  deleteSong as deleteSongFromDB,
} from "../../../firebase/firebase";

const PlaylistContext = createContext({ refreshPlaylist: () => {} });

export const PlaylistContextProvider = ({ children, ...props }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    name: "",
    uuid: "",
  });
  const [loading, setLoading] = useState(true);

  //   const refreshPlaylist = (jwt) => {
  //     fetchPlaylists(jwt)
  //       .then((Playlist) => setPlaylists(Playlist))
  //       .finally(() => setLoading(false));
  //   };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getPlaylists();
    if (result) {
      setPlaylists(
        Object.keys(result).map((playlistName) => {
          return {
            name: playlistName,
            uuid: result[playlistName].uuid,
            songs: result[playlistName].playlist,
            songCount: result[playlistName].playlist
              ? Object.keys(result[playlistName].playlist).length
              : 0,
          };
        })
      );

      setLoading(false);
    } else {
      setPlaylists([]);
    }
  }, []);

  const selectPlaylist = ({ playlist, uuid }) => {
    console.log(playlist, "!!!");
    setSelectedPlaylist({ name: playlist, uuid });
  };

  const getPlaylistId = () => {
    const uuid = getUUID(selectedPlaylist.name);
    setSelectedPlaylist({ name: selectedPlaylist.name, uuid });
  };

  const createPlaylist = (playlistName) => {
    const id = uuidv1();
    setUUID(playlistName, id);
    selectPlaylist({ playlist: playlistName, uuid: id });
  };

  const deletePlaylist = () => {
    deletePlaylistFromDB(selectedPlaylist.name);
  };

  const addSong = (songInfo) => {
    console.log(songInfo);
    console.log(selectedPlaylist);
    addSongToPlaylistFirebase(songInfo, selectedPlaylist.name);
  };

  const deleteSong = async (songId) => {
    await deleteSongFromDB(songId, selectedPlaylist.name);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        setPlaylists,
        loading,
        createPlaylist,
        selectPlaylist,
        selectedPlaylist,
        deletePlaylist,
        addSong,
        deleteSong,
      }}
      {...props}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export function usePlaylistContext() {
  const context = useContext(PlaylistContext);

  if (context === null) {
    throw new Error("Using playlist context outside provider"); // throw error if using this hook outside the provider
  }

  return context;
}

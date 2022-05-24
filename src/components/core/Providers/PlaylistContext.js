import React, { createContext, useContext, useState, useEffect } from "react";
import {
  setPlaylistName,
  getPlaylists,
  setUUID,
} from "../../../firebase/firebase";

const PlaylistContext = createContext({ refreshPlaylist: () => {} });

export const PlaylistContextProvider = ({ children, ...props }) => {
  const [playlists, SetPlaylists] = useState([]);
  const [selectedPlaylist, SetSelectedPlaylist] = useState([]);
  const [loading, SetLoading] = useState(true);

  //   const refreshPlaylist = (jwt) => {
  //     fetchPlaylists(jwt)
  //       .then((Playlist) => setPlaylists(Playlist))
  //       .finally(() => setLoading(false));
  //   };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await getPlaylists();

    if (result) {
      console.log(result);
      SetPlaylists(
        Object.keys(result).map((playlistName) => {
          console.log(result, result[playlistName]);
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
      SetLoading(false);
    } else {
      SetPlaylists([]);
    }
  }, []);

  const selectPlaylist = ({ playlist, uuid }) => {
    setPlaylistName(playlist);
    setUUID(uuid);
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, SetPlaylists, loading, selectPlaylist }}
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

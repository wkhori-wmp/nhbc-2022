import React, { createContext, useContext, useState, useEffect } from "react";
import {
  setPlaylistName,
  getPlaylistName,
  setUUID,
  getUUID,
  getPlaylists,
} from "../../../firebase/firebase";

const PlaylistContext = createContext({ refreshPlaylist: () => {} });

export const PlaylistContextProvider = ({ children, ...props }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    name: getPlaylistName(),
    uuid: getUUID(),
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
    setSelectedPlaylist({ playlist, uuid });
    setPlaylistName(playlist);
    setUUID(uuid);
  };

  const createPlaylist = ({ playlist, uuid }) => {
    // TODO Finish
  };

  const deletePlaylist = ({ playlist, uuid }) => {
    // TODO Finish
  };

  const deleteSong = ({ playlist, uuid }) => {
    // TODO Finish
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        setPlaylists,
        loading,
        selectPlaylist,
        selectedPlaylist,
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

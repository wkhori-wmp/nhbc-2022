import React, { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext({ refreshPlaylist: () => {} });

const LOCATIONS = [
  "CHI",
  "DAL",
  "DC",
  "LA",
  "LDN",
  "MPLS",
  "NYC",
  "Remote",
  "SEA",
  "SF",
];

export const PlaylistContextProvider = ({ children, ...props }) => {
  const [Playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshPlaylist = (jwt) => {
    fetchPlaylist(jwt)
      .then((Playlist) => setPlaylist(Playlist))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      try {
        refreshPlaylist(user.jwt);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  return (
    <PlaylistContext.Provider
      value={{ Playlist, setPlaylist, refreshPlaylist, loading }}
      {...props}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;

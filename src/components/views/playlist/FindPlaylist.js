import React, { useEffect, useState } from "react";
import {
  getUsername,
  setUsername,
  getPlaylists,
} from "../../../firebase/firebase";
import styled from "styled-components";
import PlaylistList from "./PlaylistList";
import { Spinner } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FindPlaylist = ({ getPlaylist }) => {
  const [userId, setUserId] = useState(getUsername());
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load playlists from firebase on mount
  useEffect(() => {
    getPlaylists()
      .then((playlists) => {
        const data = Object.keys(playlists).map((playlistName) => ({
          name: playlistName,
          songs: playlists[playlistName].playlist,
          songCount: Object.keys(playlists[playlistName].playlist).length,
        }));
        setPlaylists(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePlaylistChange = (event) => {
    setUserId(event.target.value);
  };

  const findPlaylist = () => {
    setUsername(userId);
    getPlaylist();
  };

  const handlePlaylistSelection = (username) => {
    setUsername(username);
    getPlaylist();
  };

  return (
    <FlexContainer>
      <div>
        <h1> Create a Playlist</h1>
        <div style={{ margin: "20px 0" }}>
          Enter the name of the playlist you'd like to create.
        </div>
        <label>
          Playlist Name:
          <input
            style={{ marginLeft: "10px" }}
            type="text"
            value={userId}
            name="name"
            onChange={handlePlaylistChange}
          />
        </label>
        <button onClick={findPlaylist} style={{ marginLeft: "30px" }}>
          Create
        </button>
      </div>
      <h1> Existing Playlists</h1>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size="8rem" />
        </LoadingContainer>
      ) : (
        <PlaylistList
          playlists={playlists}
          handlePlaylistSelection={handlePlaylistSelection}
        />
      )}
    </FlexContainer>
  );
};

export default FindPlaylist;

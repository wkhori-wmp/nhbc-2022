import React, { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { setUsername, getPlaylists } from "../../../firebase/firebase";
import styled from "styled-components";
import PlaylistList from "./PlaylistList";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const id = uuidv1();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load playlists from firebase on mount
  useEffect(() => {
    setUsername("");
    getAllPlaylists();
  }, []);

  const getAllPlaylists = async () => {
    const result = await getPlaylists();
    console.log(result);
    if (result) {
      setPlaylists(
        Object.keys(result).map((playlistName) => ({
          name: playlistName,
          uuid: result[playlistName].uuid,
          songs: playlistName.playlist,
          songCount: Object.keys(result[playlistName].playlist).length,
        }))
      );
      console.log(playlists);
      setLoading(false);
    } else {
      setPlaylists([]);
    }
  };

  const handlePlaylistChange = (event) => {
    setUserId(event.target.value);
  };

  const findPlaylist = () => {
    console.log(playlists);
    if (playlists.filter((p) => p.name === userId).length > 0) {
      alert("A playlist with that name already exists");
    } else {
      setUsername(userId);
      getPlaylist();
      console.log(id);
      history.push("/add-song", { uuid: id });
    }
  };

  const handlePlaylistSelection = (username, uuid) => {
    setUsername(username);
    console.log(uuid);
    history.push(`/playlist/${uuid || uuid.uuid}`);
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

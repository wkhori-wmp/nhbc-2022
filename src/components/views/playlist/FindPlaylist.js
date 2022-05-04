import React, { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { setUsername, getPlaylists, setUUID } from "../../../firebase/firebase";
import styled from "styled-components";
import PlaylistList from "./PlaylistList";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FindPlaylist = () => {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const id = uuidv1();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load playlists from firebase on mount
  useEffect(() => {
    setUserId("");
    getAllPlaylists();
  }, []);

  const getAllPlaylists = async () => {
    const result = await getPlaylists();
    if (result && !userId) {
      setPlaylists(
        Object.keys(result).map((playlistName) => ({
          name: playlistName,
          uuid: result[playlistName].uuid,
          songs: playlistName.playlist,
          songCount: Object.keys(result[playlistName].playlist).length,
        }))
      );
      setLoading(false);
    } else {
      setPlaylists([]);
    }
  };

  const handlePlaylistChange = (event) => {
    setUserId(event.target.value);
  };

  const findPlaylist = () => {
    if (userId === "") {
      alert("Please enter at least one character for a playlist name!");
    } else if (playlists.filter((p) => p.name === userId).length > 0) {
      alert("A playlist with that name already exists");
    } else {
      setUsername(userId);
      history.push(`/add-song/${id}`, { uuid: id });
    }
  };

  const handlePlaylistSelection = (username, uuid) => {
    setUsername(username);
    setUUID(uuid);
    history.push(`/playlist/${uuid}`);
  };

  return (
    <FlexContainer>
      <div>
        <h1> Create a Playlist</h1>
        <div style={{ margin: "20px 0" }}>
          Enter the name of the playlist you'd like to create.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Form.Label>Playlist Name:</Form.Label>
          <Form.Control
            required
            style={{ width: "50%", marginLeft: "20px" }}
            type="text"
            name="name"
            value={userId}
            onChange={handlePlaylistChange}
            feedbackType="invalid"
          />
          <Button
            variant="primary"
            onClick={findPlaylist}
            style={{ marginLeft: "30px" }}
          >
            Create
          </Button>
        </div>
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

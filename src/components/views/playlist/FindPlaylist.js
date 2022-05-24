/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
import { setUsername, getPlaylists, setUUID } from "../../../firebase/firebase";
import PlaylistList from "./PlaylistList";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import { PageWrapper } from "../style";

const FindPlaylist = () => {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = uuidv1();

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
    <PageWrapper>
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
            style={{
              width: "50%",
              marginLeft: "20px",
              backgroundColor: "#e9eef1",
            }}
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
        <LoadingIcon />
      ) : (
        <PlaylistList
          playlists={playlists}
          handlePlaylistSelection={handlePlaylistSelection}
        />
      )}
    </PageWrapper>
  );
};

export default FindPlaylist;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
import { setPlaylistName } from "../../../firebase/firebase";
import { usePlaylistContext } from "../../core/Providers/PlaylistContext";
import PlaylistList from "./PlaylistList";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import { PageWrapper } from "../style";
import {
  CreatePlaylistFormWrapper,
  createPlaylistFormInputStyles,
} from "./Playlist.style";

// Shared component between /playlist and /add-song
const FindPlaylist = () => {
  const history = useHistory();
  const { playlists, loading } = usePlaylistContext();
  const [playlistID, setPlaylistID] = useState("");
  const id = uuidv1();

  const handlePlaylistChange = (event) => {
    setPlaylistID(event.target.value);
  };

  const findPlaylist = () => {
    if (playlistID === "") {
      alert("Please enter at least one character for a playlist name!");
    } else if (playlists.filter((p) => p.name === playlistID).length > 0) {
      alert("A playlist with that name already exists");
    } else {
      setPlaylistName(playlistID);
      history.push(`/add-song/${id}`, { uuid: id });
    }
  };

  return (
    <PageWrapper>
      <div>
        <h1> Create a Playlist</h1>
        <div>Enter the name of the playlist you'd like to create.</div>
        <CreatePlaylistFormWrapper>
          <Form.Label>Playlist Name:</Form.Label>
          <Form.Control
            required
            style={createPlaylistFormInputStyles}
            type="text"
            name="name"
            value={playlistID}
            onChange={handlePlaylistChange}
            feedbackType="invalid"
          />
          <Button
            variant="primary"
            onClick={findPlaylist}
            style={{ marginLeft: "5px" }}
          >
            Create
          </Button>
        </CreatePlaylistFormWrapper>
      </div>
      <h1> Existing Playlists</h1>
      {loading ? <LoadingIcon /> : <PlaylistList playlists={playlists} />}
    </PageWrapper>
  );
};

export default FindPlaylist;

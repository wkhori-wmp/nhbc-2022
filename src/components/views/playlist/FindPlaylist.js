/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
import {
  setPlaylistName,
  getPlaylists,
  setUUID,
} from "../../../firebase/firebase";
import PlaylistList from "./PlaylistList";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import { PageWrapper } from "../style";
import {
  CreatePlaylistFormWrapper,
  createPlaylistFormInputStyles,
} from "./Playlist.style";

const FindPlaylist = () => {
  const history = useHistory();
  const [playlistID, setPlaylistID] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = uuidv1();

  // Load playlists from firebase on mount
  useEffect(() => {
    setPlaylistID("");
    getAllPlaylists();
  }, []);

  const getAllPlaylists = async () => {
    const result = await getPlaylists();
    if (result.length && !playlistID) {
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

  const handlePlaylistSelection = (playlist, uuid) => {
    setPlaylistName(playlist);
    setUUID(uuid);
    history.push(`/playlist/${uuid}`);
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

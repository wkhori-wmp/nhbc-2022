import React, { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { setUsername, getPlaylists, setUUID } from "../../../firebase/firebase";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PlaylistList from "../playlist/PlaylistList";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AddSongToPlaylist = ({ getPlaylist }) => {
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

  const handlePlaylistSelection = (username, uuid) => {
    setUsername(username);
    setUUID(uuid);
    console.log(uuid);
    history.push(`/add-song/${uuid}`);
  };

  return (
    <FlexContainer>
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

export default AddSongToPlaylist;

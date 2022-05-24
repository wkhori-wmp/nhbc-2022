/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import {
  setPlaylistName,
  getPlaylists,
  setUUID,
} from "../../../firebase/firebase";
import PlaylistList from "../Playlist/PlaylistList";
import { AddSongToPlaylistWrapper } from "./AddSong.style";

const AddSongToPlaylist = () => {
  const history = useHistory();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load playlists from firebase on mount
  useEffect(() => {
    setPlaylistName("");
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

  const handlePlaylistSelection = (playlist, uuid) => {
    setPlaylistName(playlist);
    setUUID(uuid);
    console.log(uuid);
    history.push(`/add-song/${uuid}`);
  };

  return (
    <AddSongToPlaylistWrapper>
      <h1> Existing Playlists</h1>
      {loading ? (
        <LoadingIcon />
      ) : (
        <PlaylistList
          playlists={playlists}
          handlePlaylistSelection={handlePlaylistSelection}
        />
      )}
    </AddSongToPlaylistWrapper>
  );
};

export default AddSongToPlaylist;

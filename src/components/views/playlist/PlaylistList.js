import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { usePlaylistContext } from "../../core/Providers/PlaylistContext";
import { ExistingPlaylistRow } from "./Playlist.style";

const PlaylistList = ({ playlists }) => {
  const history = useHistory();
  const { selectPlaylist } = usePlaylistContext();

  const viewPlaylist = (playlist, uuid) => {
    selectPlaylist({ playlist, uuid });
    history.push(`/playlist/${uuid}`);
  };

  const addSong = (playlist, uuid) => {
    selectPlaylist({ playlist, uuid });
    history.push(`/add-song/${uuid}`);
  };

  return (
    <>
      {playlists.map((playlist) => (
        <ExistingPlaylistRow>
          <span style={{ flexGrow: 0.4 }}>
            <strong>{playlist.name}</strong>
          </span>

          <Button
            variant="link"
            className="btn-sm"
            style={{ padding: "0px" }}
            onClick={() => viewPlaylist(playlist.name, playlist.uuid)}
          >
            View Playlist
          </Button>
          <Button
            variant="link"
            className="btn-sm"
            style={{ padding: "0px" }}
            onClick={() => addSong(playlist.name, playlist.uuid)}
          >
            Add Song
          </Button>

          <span style={{ flexGrow: 0.1 }}>
            {playlist.songCount} Song
            {playlist.songCount > 1 && "s"}
          </span>
        </ExistingPlaylistRow>
      ))}
    </>
  );
};

export default PlaylistList;

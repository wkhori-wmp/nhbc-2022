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
      <ExistingPlaylistRow>
        <span style={{ flexGrow: 0.4 }}>
          <strong>{playlists[0].name}</strong>
        </span>

        <Button
          variant="link"
          className="btn-sm"
          style={{ padding: "0px" }}
          onClick={() =>
            viewPlaylist(playlists[0].name.name, playlists[0].uuid)
          }
        >
          View Playlist
        </Button>
        <Button
          variant="link"
          className="btn-sm"
          style={{ padding: "0px" }}
          onClick={() => addSong(playlists[0].name, playlists[0].uuid)}
        >
          Add Song
        </Button>
        <span style={{ flexGrow: 0.1 }}>
          {playlists[0].songCount} Song
          {playlists[0].songCount !== 1 && "s"}
        </span>
      </ExistingPlaylistRow>
    </>
  );
};

export default PlaylistList;

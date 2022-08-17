import React from "react";
import { useHistory } from "react-router-dom";
import { usePlaylistContext } from "../../core/Providers/PlaylistContext";
import {
  ExistingPlaylistRow,
  StyledPlaylistIcon,
  StyledAddSongIcon,
} from "./Playlist.style";

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
          <StyledPlaylistIcon
            onClick={() => viewPlaylist(playlist.name, playlist.uuid)}
            size="22"
          />
          <span style={{ flexGrow: 1 }}>
            <strong>{playlist.name}</strong>
          </span>

          <span>
            {playlist.songCount} Song
            {playlist.songCount !== 1 && "s"}
          </span>
          <div
            style={{
              alignSelf: "flex-end",
              display: "flex",
              gap: "5px",
            }}
          >
            <StyledAddSongIcon
              onClick={() => addSong(playlist.name, playlist.uuid)}
            />
          </div>
        </ExistingPlaylistRow>
      ))}
    </>
  );
};

export default PlaylistList;

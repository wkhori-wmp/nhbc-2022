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
        <ExistingPlaylistRow>
          <StyledPlaylistIcon
            onClick={() => viewPlaylist(playlists[0].name, playlists[0].uuid)}
            size="22"
          />
          <span style={{ flexGrow: 1 }}>
            <strong>{playlists[0].name}</strong>
          </span>

          <span>
            {playlists[0].songCount} Song
            {playlists[0].songCount !== 1 && "s"}
          </span>
          <div
            style={{
              alignSelf: "flex-end",
              display: "flex",
              gap: "5px",
            }}
          >
            <StyledAddSongIcon
              onClick={() => addSong(playlists[0].name, playlists[0].uuid)}
            />
          </div>
        </ExistingPlaylistRow>
    </>
  );
};

export default PlaylistList;

import React from "react";
import { ExistingPlaylistRow } from "./Playlist.style";

const PlaylistList = ({ playlists, handlePlaylistSelection }) => {
  return (
    <>
      {playlists.map((playlist) => (
        <ExistingPlaylistRow
          onClick={() => handlePlaylistSelection(playlist.name, playlist.uuid)}
        >
          <span
            style={{ flexGrow: "1", marginLeft: "1rem", cursor: "pointer" }}
          >
            <strong>{playlist.name}</strong>
          </span>
          <span style={{ marginRight: "1rem" }}>
            {playlist.songCount} Song
            {playlist.songCount > 1 && "s"}
          </span>
        </ExistingPlaylistRow>
      ))}
    </>
  );
};

export default PlaylistList;

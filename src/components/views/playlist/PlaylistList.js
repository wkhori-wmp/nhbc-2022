import styled from "styled-components";

const PlaylistDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: black solid 1px;
  border-radius: 5px;
  height: 6rem;
  margin-bottom: 1rem;
`;

const PlaylistList = ({ playlists, handlePlaylistSelection }) => {
  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistDiv onClick={() => handlePlaylistSelection(playlist.name)}>
          <span style={{ flexGrow: "1", marginLeft: "1rem" }}>
            <strong>{playlist.name}</strong>
          </span>
          <span style={{ marginRight: "1rem" }}>
            {playlist.songCount} Song
            {playlist.songCount > 1 && "s"}
          </span>
        </PlaylistDiv>
      ))}
    </>
  );
};

export default PlaylistList;

import styled from "styled-components";
import { PlaylistAdd, Playlist } from "tabler-icons-react";

export const YoutubeVideo = styled.iframe`
  width: 560px;
  height: 315px;
  @media (max-width: 450px) {
    width: 300px;
    height: 200px;
  }
`;

export const TrashIconWrapper = styled.div`
  &:hover .delete-button {
    color: red;
    cursor: pointer;
  }
`;

export const ExistingPlaylistRow = styled.div``;

export const CreatePlaylistFormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const createPlaylistFormInputStyles = {
  width: "75%",
  minWidth: "180px",
  backgroundColor: "#e9eef1",
};

export const StyledPlaylistIcon = styled(Playlist)``;

export const StyledAddSongIcon = styled(PlaylistAdd)``;

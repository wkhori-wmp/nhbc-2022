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

export const ExistingPlaylistRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border: black solid 1px;
  border-radius: 5px;
  height: 45px;
  margin-bottom: 1rem;
  padding-left: 12px;
  padding-right: 12px;
  &:hover {
    background-color: #909590;
  }
`;

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

export const StyledPlaylistIcon = styled(Playlist)`
  margin-top: 2px;
  &:hover {
    cursor: pointer;
    border: black solid 2px;
    border-radius: 5px;
  }
`;

export const StyledAddSongIcon = styled(PlaylistAdd)`
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    border: black solid 2px;
    border-radius: 5px;
  }
`;

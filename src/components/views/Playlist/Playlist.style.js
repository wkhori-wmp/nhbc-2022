import styled from "styled-components";

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
  justify-content: space-between;
  align-items: center;
  border: black solid 1px;
  border-radius: 5px;
  height: 45px;
  margin-bottom: 1rem;
  padding-left: 12px;
  padding-right: 12px;
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

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
  justify-content: center;
  align-items: center;
  border: black solid 1px;
  border-radius: 5px;
  height: 6rem;
  margin-bottom: 1rem;
`;

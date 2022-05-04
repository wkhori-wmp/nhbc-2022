import {
  createItem,
  getUsername,
  setUsername,
  getUUID,
  createItemAndUUID,
  setUUID,
  getPlaylists,
} from "../../../firebase/firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AddSongWrapper,
  AddSongForm,
  FormTitle,
  YoutubeIcon,
} from "./AddSong.style";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../core/forms/FormInputField";
import translations from "./config/translations";
import validations from "./config/validations";
import { useLocation, useParams } from "react-router-dom";
import AddSongToPlaylist from "./AddSongToPlaylist";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  const location = useLocation();
  const uuid = getUUID();
  const { playlistId } = useParams();
  const username = getUsername();
  const [loading, setLoading] = useState(true);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    if (username === "") {
      getPlaylistNameByUUID(playlistId);
    }
    setLoading(false);
    console.log(username, playlistName);
  }, []);

  const getPlaylistNameByUUID = async (id) => {
    const result = await getPlaylists();
    console.log(result);
    if (result && playlistId) {
      await setPlaylistName(
        Object.keys(result)[
          Object.values(result).findIndex((r) => r.uuid === id)
        ]
      );
      setUsername(
        Object.keys(result)[
          Object.values(result).findIndex((r) => r.uuid === id)
        ]
      );
    }
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      ytLink: "",
      index: Math.round(Math.random() * 1000),
    },
  });

  const onSubmit = async (formData) => {
    await createItem(formData);
    await setUUID(playlistId);
    history.push("/playlist");
  };

  const {
    addSong: {
      inputs: { title, artist, album, ytLink },
    },
  } = translations;
  const {
    addSong: {
      titleFieldValidation,
      artistFieldValidation,
      albumFieldValidation,
      ytLinkFieldValidation,
    },
  } = validations;

  // Early return if a playlist has not been created or selected
  if (!playlistId) {
    return (
      <AddSongWrapper>
        <FormTitle>Add Song</FormTitle>
        <div style={{ margin: "20px 0" }}>
          Create or select an existing playlist before adding a song.
          <AddSongToPlaylist />
        </div>
      </AddSongWrapper>
    );
  }

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size="8rem" />
        </LoadingContainer>
      ) : (
        <AddSongWrapper>
          <FormTitle>Add song for {username || playlistName}</FormTitle>
          <FormProvider register={register}>
            <AddSongForm onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor={title.label}>Title:</label>
              <FormInputField
                name={title.label}
                errors={errors}
                type="text"
                placeholder={title.placeholder}
                validations={titleFieldValidation}
              />
              <label htmlFor={artist.label}>Artist:</label>
              <FormInputField
                name={artist.label}
                type="text"
                errors={errors}
                placeholder={artist.placeholder}
                validations={artistFieldValidation}
              />
              <label htmlFor={album.label}>Album:</label>
              <FormInputField
                name={album.label}
                type="text"
                errors={errors}
                placeholder={album.placeholder}
                validations={albumFieldValidation}
              />
              <label htmlFor={ytLink.label}>
                YouTube Link:
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.youtube.com"
                >
                  <YoutubeIcon src="/youtube.png" />
                </a>
              </label>
              <FormInputField
                name={ytLink.label}
                type="text"
                errors={errors}
                placeholder={ytLink.placeholder}
                validations={ytLinkFieldValidation}
              />
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "0 auto" }}
              >
                Add song
              </Button>
            </AddSongForm>
          </FormProvider>
        </AddSongWrapper>
      )}
    </>
  );
};

export default AddSong;

import {
  createItem,
  getUsername,
  getUUID,
  createItemAndUUID,
  setUUID,
} from "../../../firebase/firebase";
import React from "react";
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
import { useLocation } from "react-router-dom";

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  const location = useLocation();
  const uuid = getUUID();
  const username = getUsername();

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
    },
  });

  const onSubmit = async (formData) => {
    await createItem(formData);
    if (location.state === undefined) {
      console.log("location state undefined");
    } else {
      await setUUID(location.state.uuid);
    }
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
  if (username === "") {
    return (
      <AddSongWrapper>
        <FormTitle>Add Song</FormTitle>
        <div style={{ margin: "20px 0" }}>
          Create or select an existing playlist before adding a song.
        </div>
      </AddSongWrapper>
    );
  }

  return (
    <AddSongWrapper>
      <FormTitle>Add song for {username}</FormTitle>
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
          <Button variant="primary" type="submit" style={{ margin: "0 auto" }}>
            Add song
          </Button>
        </AddSongForm>
      </FormProvider>
    </AddSongWrapper>
  );
};

export default AddSong;

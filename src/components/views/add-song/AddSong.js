import { createItem } from "../../../firebase/firebase";
import React from "react";
import { useHistory } from "react-router-dom";
import { AddSongWrapper, AddSongForm, FormTitle } from "./AddSong.style";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../core/forms/FormInputField";
import translations from "./config/translations";
import validations from "./config/validations";

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();

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

  const onSubmit = (formData) => {
    createItem(formData).then(() => {
      history.push("/playlist");
    });
  };

  const translationObj = translations.addSong;
  const validationObj = validations.addSong;

  return (
    <AddSongWrapper>
      <FormTitle>Add Song</FormTitle>
      <FormProvider register={register}>
        <AddSongForm onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title:</label>
          <FormInputField
            name="title"
            errors={errors}
            type="text"
            placeholder={translationObj.inputs.title.placeholder}
            validations={validationObj.title}
          />
          <label htmlFor="artist">Artist:</label>
          <FormInputField
            name="artist"
            type="text"
            errors={errors}
            placeholder={translationObj.inputs.artist.placeholder}
            validations={validationObj.artist}
          />
          <label htmlFor="album">Album:</label>
          <FormInputField
            name="album"
            type="text"
            errors={errors}
            placeholder={translationObj.inputs.album.placeholder}
            validations={validationObj.album}
          />
          <label htmlFor="ytlink">YouTube Link:</label>
          <FormInputField
            name="ytLink"
            type="text"
            errors={errors}
            placeholder={translationObj.inputs.ytLink.placeholder}
            validations={validationObj.ytLink}
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

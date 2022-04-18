import { createItem } from "../../../firebase/firebase";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  AddSongWrapper,
  AddSongForm,
  FormInputField,
  FormTitle,
} from "./AddSong.style";
import { Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();

  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      mode: 'onSubmit',
      defaultValues: {
        title: "",
        artist: "",
        album: "",
        ytLink: "",
      },
    }
  );

  const onSubmit = (formData) => {
    createItem(formData).then(() => {
      history.push("/playlist");
    });
  };

  return (
    <AddSongWrapper>
      <FormTitle>Add Song</FormTitle>
      <AddSongForm onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <FormInputField
          type="text"
          placeholder="Enter the title of your song here"
          {...register("title", { required: true })}
        />
        {errors.title && <p style={{ color: "red"}}>This field is required</p>}
        <label>Artist:</label>
        <FormInputField
          type="text"
          placeholder="Enter the artist here"
          {...register("artist", { required: true })}
        />
        {errors.artist && <p style={{ color: "red"}}>This field is required</p>}
        <label>Album:</label>
        <FormInputField
          type="text"
          placeholder="Enter the album here"
          {...register("album", { required: true })}
        />
        {errors.album && <p style={{ color: "red"}}>This field is required</p>}
        <label>YouTube Link:</label>
        <FormInputField
          type="text"
          placeholder="Enter a YouTube link here. Note: must start with https://www.youtube.com/watch?v="
          {...register("ytLink", { required: true, pattern:  /^https:\/\/www\.youtube\.com\/watch\?v=.*/})}
        />
        {errors.ytLink && <p style={{ color: "red"}}>This field is required and must be a youtube link.</p>}
        <Button variant="primary" type="submit" style={{ margin: "0 auto" }}>
          Add song
        </Button>
      </AddSongForm>
    </AddSongWrapper>
  );
};

export default AddSong;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import FormInputField from "../../core/Forms/FormInputField";
import { formFields } from "./utils";
import { PageWrapper } from "../style";
import FindPlaylist from "../Playlist/FindPlaylist";
import { usePlaylistContext } from "../../core/Providers/PlaylistContext";
import {
  AddSongForm,
  FormTitle,
  YoutubeIcon,
  addSongButtonStyles,
} from "./AddSong.style";

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  const { playlistId } = useParams();
  const {
    selectedPlaylist: { name },
    loading,
    addSong,
  } = usePlaylistContext();

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
    await addSong(formData);
    history.push("/playlist");
  };

  const {
    inputs: { title, artist, album, ytLink },
  } = formFields;

  return (
    <>
      {!playlistId ? (
        <FindPlaylist />
      ) : (
        <>
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <PageWrapper>
                <FormTitle>Add song for {name}</FormTitle>
                <FormProvider register={register}>
                  <AddSongForm onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor={title.label}>Title:</label>
                    <FormInputField
                      name={title.label}
                      errors={errors}
                      type="text"
                      placeholder={title.placeholder}
                      validations={title.validation}
                    />
                    <label htmlFor={artist.label}>Artist:</label>
                    <FormInputField
                      name={artist.label}
                      type="text"
                      errors={errors}
                      placeholder={artist.placeholder}
                      validations={artist.validation}
                    />
                    <label htmlFor={album.label}>Album:</label>
                    <FormInputField
                      name={album.label}
                      type="text"
                      errors={errors}
                      placeholder={album.placeholder}
                      validations={album.validation}
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
                      validations={ytLink.validation}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      style={addSongButtonStyles}
                    >
                      Add song
                    </Button>
                  </AddSongForm>
                </FormProvider>
              </PageWrapper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddSong;

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
    playlists,
    selectPlaylist,
    loading,
    addSong,
  } = usePlaylistContext();

  useEffect(() => {
    if (playlistId) {
      const currPlaylist = playlists.find(
        (playlist) => playlist.uuid === playlistId
      );
      selectPlaylist({ playlist: currPlaylist?.name, uuid: playlistId });
    }
  }, [playlists]);

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
    console.log(formData);
    /*
     * For this TO DO, implement the following features:
     *
     * 1. add the song to our backend (hint: go check out some of the API calls in src/components/core/Providers/PlaylistContext.js)
     * 2. redirect the user to the playlist using the useHistory hook (https://v5.reactrouter.com/web/api/Hooks)
     */
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

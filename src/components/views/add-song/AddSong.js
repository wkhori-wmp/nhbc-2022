import { createItem } from '../../../firebase/firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddSongWrapper, AddSongForm, FormInputField, FormTitle } from './AddSong.style';

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  // Default values for the form
  const initialValues = {
    title: '',
    artist: '',
    album: '',
  };

  // State variable used to control the form
  // useState declares the state variable, this preserves values between function calls
  const [values, setValues] = useState(initialValues);

  // updates the appropriate value in the state variable "values" object
  // in short, it updates the form, without it, you will not be able to enter data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault prevents the default event action
    // in this case for a submit button it stops the page from reloading
    e.preventDefault();

    const playlistItem = {
      title: e.target[0].value,
      artist: e.target[1].value,
      album: e.target[2].value,
    };

    createItem(playlistItem).then(() => {
      history.push('/playlist');
    });
  };

  return (
    <AddSongWrapper>
      <FormTitle>Add Song</FormTitle>
      <AddSongForm onSubmit={handleSubmit}>
        <label>
          Title:
        </label>
        <FormInputField name="title" type="text" defaultValue={values.title} required={true} onChange={handleInputChange} />
        <label>
          Artist:
          </label>
          <FormInputField name="artist" type="text" defaultValue={values.artist} required={true} onChange={handleInputChange} />
        <label>
          Album:
          </label>
          <FormInputField name="album" type="text" defaultValue={values.album} required={false} onChange={handleInputChange} />
          <label>
          YouTube Link:
          </label>
          <FormInputField name="ytLink" type="text" defaultValue={values.ytLink} required={false} onChange={handleInputChange} />
        <input type="submit" value="Add Song" />
      </AddSongForm>
    </AddSongWrapper>
  );
};

export default AddSong;

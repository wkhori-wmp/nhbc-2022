import { createItem } from '../../../firebase/firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddSongWrapper, AddSongForm, FormInputField, FormTitle } from './AddSong.style';
import { Button } from 'react-bootstrap';

const AddSong = () => {
  // The useHistory hook gives you access to the history instance that you may use to navigate.
  const history = useHistory();
  // Default values for the form
  const initialValues = {
    title: '',
    artist: '',
    album: '',
    ytLink: '',
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
      ytLink: e.target[3].value,
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
        <FormInputField 
          name="title"
          type="text"
          placeholder='Enter the title of your song here'
          defaultValue={values.title}
          required={true}
          onChange={handleInputChange} />
        <label>
          Artist:
          </label>
          <FormInputField 
            name="artist" 
            type="text" 
            placeholder='Enter the artist here'
            defaultValue={values.artist} 
            required={true} 
            onChange={handleInputChange} />
        <label>
          Album:
          </label>
          <FormInputField 
            name="album" 
            type="text" 
            placeholder='Enter the album here'
            defaultValue={values.album} 
            required={true} 
            onChange={handleInputChange} />
          <label>
          YouTube Link:
          </label>
          <FormInputField 
            name="ytLink" 
            type="text" 
            placeholder='Enter a YouTube link here. Note: must start with https://www.youtube.com/watch?v='
            pattern="^https:\/\/www\.youtube\.com\/watch\?v=.*"
            defaultValue={values.ytLink} 
            required={true} 
            onChange={handleInputChange} />
        <Button 
          variant="primary"
          type="submit"
          style={{ margin: "0 auto", }}
        >
          Add song
        </Button>
        </AddSongForm>
    </AddSongWrapper>
  );
};

export default AddSong;

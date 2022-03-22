import { createItem } from '../../../firebase/firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Box, Button } from '@material-ui/core';
import { AddSongWrapper } from './AddSong.style';

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
      <h1>Add Song</h1>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        component='form'
        gridRowGap='30px'
        width='100%'
        onSubmit={handleSubmit}
      >
        <TextField
          required
          autoComplete='off'
          label='Title'
          name='title'
          value={values.title}
          onChange={handleInputChange}
        />
        <TextField
          required
          autoComplete='off'
          label='Artist'
          name='artist'
          value={values.artist}
          onChange={handleInputChange}
        />
        <TextField
          autoComplete='off'
          label='Album'
          name='album'
          value={values.album}
          onChange={handleInputChange}
        />
        <TextField
          autoComplete='off'
          label='YouTube Link'
          name='ytLink'
          value={values.ytLink}
          onChange={handleInputChange}
        />
        <Button color='primary' type='submit'>
          Add Song
        </Button>
      </Box>
    </AddSongWrapper>
  );
};

export default AddSong;

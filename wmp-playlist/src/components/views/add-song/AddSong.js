import { createItem } from '../../../firebase/firebase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Box, Button } from '@material-ui/core/TextField';

const AddSong = () => {

  const history = useHistory();

  const initialValues = {
    title: '',
    artist: '',
    album: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    const playlistItem = {
      title: e.target[0].value,
      artist: e.target[1].value,
      album: e.target[2].value,
    }

    createItem(playlistItem).then(() => {
      history.push('/playlist');
    });
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-evenly" 
      alignItems="center" 
      textAlign="center"
      minHeight="50vh"
      component="form"
      onSubmit={handleSubmit}
      >
      <h1>Add Song</h1>
        <TextField 
          required 
          autoComplete="off"
          label="Title"
          name="title"
          value={values.title} 
          onChange={handleInputChange}
        />
        <TextField 
          required 
          autoComplete="off"
          label="Artist" 
          name="artist"
          value={values.artist}
          onChange={handleInputChange}
        />
        <TextField 
          autoComplete="off"
          label="Album"
          name="album"
          value={values.album}
          onChange={handleInputChange}
        />
        <Button 
          color="primary" 
          type="submit">
          Add Song
        </Button>
    </Box>
  );
};

export default AddSong;

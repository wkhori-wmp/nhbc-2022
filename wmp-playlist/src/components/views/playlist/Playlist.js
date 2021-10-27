import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { PlaylistWrapper } from './Playlist.style';
import { getItems, deleteItem } from '../../../firebase/firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Playlist = () => {
  const classes = useStyles();
  let [mySongsArr, setmySongsArr] = useState([]);

  // Use effect hook with an empty dependency array [], will run only on mounted
  // This means it will only one the code it contains one time
  useEffect(() => {
    getItems().then(function (result) {
      setmySongsArr(
        Object.keys(result).map((item) => ({ ...result[item], id: item }))
      );
    });
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
  }

  return (
    <PlaylistWrapper>
      <h1>Playlist</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>TITLE</TableCell>
              <TableCell>ARTIST</TableCell>
              <TableCell>ALBUM</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* To render an array of jsx items you can use a map the key in a map is important
                so React knows which item to update when its value changes without the key react
                will re-render the entire list this wont cause any issues if the list is short
                but if you have a very long list it will cause performance issues  */}
            {mySongsArr.map((song) => (
              <TableRow key={song.id}>
                <TableCell component='th' scope='row'>
                  {song.title}
                </TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell onClick={() => handleDelete(song.id)}>
                  DELETE
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PlaylistWrapper>
  );
};

export default Playlist;

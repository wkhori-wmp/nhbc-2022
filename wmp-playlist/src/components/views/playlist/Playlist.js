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
import { getItems } from '../../../firebase/firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Playlist = () => {
  const classes = useStyles();
  let [mySongsArr, setmySongsArr] = useState([]);

  useEffect(() => {
    getItems().then(function (result) {
      setmySongsArr(
        Object.keys(result).map((item) => ({ ...result[item], id: item }))
      );
    });
  }, []);

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
            {mySongsArr.map((song) => (
              <TableRow key={song.id}>
                <TableCell component='th' scope='row'>
                  {song.title}
                </TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell onClick={() => console.log(song.id)}>
                  DELETE
                </TableCell>
                {/* ADD IN DELETE FUNCTION */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PlaylistWrapper>
  );
};

export default Playlist;

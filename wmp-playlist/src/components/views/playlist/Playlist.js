import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getItems, deleteItem } from '../../../firebase/firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Playlist = () => {
  const classes = useStyles();
  let [mySongsArr, setmySongsArr]  = useState([]);

  const fetchSongs = () => {
    getItems().then(function(result) {
      console.log(result);
      if (!result) setmySongsArr([]);
      else setmySongsArr(Object.keys(result).map(item => ( { ...result[item], id: item } ) ));
    }); 
  }

  useEffect(() => {
    fetchSongs();
  },[]);

  const handleDelete = async (id) => {
    await deleteItem(id);
    await fetchSongs();
    console.log('here')
  }
  
  console.log(mySongsArr)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
              <TableCell component="th" scope="row">
                {song.title}
              </TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell onClick={() => handleDelete(song.id)}>DELETE</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Playlist;

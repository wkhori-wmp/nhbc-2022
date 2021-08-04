import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getItems } from '../../../firebase/firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Playlist = () => {
  const classes = useStyles();
  let [mySongsArr, setmySongsArr]  = useState([])

  useEffect(() => {
    getItems().then(function(result) {
      console.log(result)
      setmySongsArr(Object.keys(result).map(item => ( { ...result[item], id: item } ) ));
    }); 
  },[]);

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
              <TableCell onClick={() => console.log(song.id)}>DELETE</TableCell> 
              {/* ADD IN DELETE FUNCTION */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Playlist;

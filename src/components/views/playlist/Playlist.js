import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { PlaylistWrapper } from './Playlist.style';
import { getItems, deleteItem } from '../../../firebase/firebase';
import BootstrapTable from 'react-bootstrap-table-next';

const Playlist = () => {
  // const classes = useStyles();
  let [mySongsArr, setmySongsArr] = useState([
  {index: 1, title: 'Dream On', artist: 'Aerosmith', album: 'Aerosmith', ytLink: 'https://www.youtube.com/watch?v=89dGC8de0CA', delete: 'https://media.istockphoto.com/vectors/trash-cangarbage-canrubbish-bin-icon-vector-id928418914?k=20&m=928418914&s=612x612&w=0&h=hP_RnwBPgcWMJoHqGw9A12vwy5IY3fzfr2dXpx4m6j8='}
  ]);

  const getPlaylist = () => {
    getItems().then(function (result) {
      setmySongsArr(
        Object.keys(result).map((item) => ({ ...result[item], id: item }))
      );
    });
  }

  const expandRow = {
    renderer: row => (
      <div style={{display: 'flex',  justifyContent:'center'}}>
        <iframe width="560" height="315" src={'https://youtube.com/embed/'+row.ytLink.split('?v=')[1]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    )
  };

  // Use effect hook with an empty dependency array [], will run only on mounted
  // This means it will only one the code it contains one time
  useEffect(() => {
    getPlaylist();
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
    getPlaylist();
  }

  function imageFormatter(cell, row) {
    return <div style={{cursor: 'pointer'}} onClick={() => console.log('delete this song', row)}>
            <img src={cell} height={20}/>
          </div> ;
  }

  const columns = [{
    dataField: 'index',
    text: '#',
    align: 'center',
    headerAlign: 'center',
  }, {
    dataField: 'title',
    align: 'center',
    text: 'Song Title',
    headerAlign: 'center',
  }, {
    dataField: 'artist',
    align: 'center',
    text: 'Artist',
    headerAlign: 'center',
  }, {
    dataField: 'delete',
    align: 'center',
    text: 'Delete?',
    headerAlign: 'center',
    formatter: imageFormatter
  }];

  return (
    <PlaylistWrapper>
      <h1>Playlist</h1>
      <BootstrapTable 
          noDataIndication={() => console.log('No Data or clothes!')}
          keyField='index'
          data={ mySongsArr }
          columns={ columns }
          expandRow={ expandRow }
      />
      {/* <Table striped bordered hover minWidth="350">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Album</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {mySongsArr.map((song) => (
              <tr key={song.id}>
                <td>{song.index}</td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>
                  <Button color='primary' onClick={() => handleDelete(song.id)}>DELETE</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table> */}
    </PlaylistWrapper>
  );
};

export default Playlist;

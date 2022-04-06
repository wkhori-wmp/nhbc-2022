import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { PlaylistWrapper } from './Playlist.style';
import { getItems, deleteItem } from '../../../firebase/firebase';
import BootstrapTable from 'react-bootstrap-table-next';
import styled from 'styled-components';
import { Trash, Trash2 } from 'react-feather';

const TRASH_URL = 'https://media.istockphoto.com/vectors/trash-cangarbage-canrubbish-bin-icon-vector-id928418914?k=20&m=928418914&s=612x612&w=0&h=hP_RnwBPgcWMJoHqGw9A12vwy5IY3fzfr2dXpx4m6j8=';

const YoutubeVideo = styled.iframe`
  width: 560px;
  height: 315px;
  @media (max-width: 450px) {
    width: 300px;
    height: 200px;
  }
`;

const TrashIconWrapper = styled.div`
&:hover .delete-button {
  color: red;
}
`

const Playlist = () => {
  // const classes = useStyles();
  let [mySongsArr, setmySongsArr] = useState([
  {index: 1, title: 'Dream On', artist: 'Aerosmith', album: 'Aerosmith', ytLink: 'https://www.youtube.com/watch?v=89dGC8de0CA', delete: TRASH_URL},
  {index: 2, title: 'Beat It', artist: 'Michael Jackson', album: 'Thriller', ytLink: 'https://www.youtube.com/watch?v=oRdxUFDoQe0', delete: TRASH_URL},
  {index: 3, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', ytLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', delete: TRASH_URL}
  ]);

  const getPlaylist = () => {
    getItems().then(function (result) {
      setmySongsArr(
        Object.keys(result).map((item, index) => ({ ...result[item], id: item, index: index + 1 }))
      );
    });
  }

  const expandRow = {
    renderer: row => (
      <div style={{display: 'flex',  justifyContent:'center'}}>
        <YoutubeVideo src={'https://youtube.com/embed/'+row.ytLink.split('?v=')[1]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></YoutubeVideo>
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

  const removeSong = (id) => {
    handleDelete(id);
    let newSongArr = mySongsArr.filter(a => a.id !== id)
    setmySongsArr(newSongArr)
  }

  function imageFormatter(cell, row) {
    return (<TrashIconWrapper
              style={{cursor: 'pointer'}}
              onClick={() => { removeSong(row.id) }}>
            <Trash2 className='delete-button'/>
          </TrashIconWrapper>);
  }

  const columns = [{
    dataField: 'index',
    text: '#',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    style: { cursor: 'pointer' }
  }, {
    dataField: 'title',
    align: 'center',
    text: 'Song Title',
    headerAlign: 'center',
    sort: true,
    style: { cursor: 'pointer' }
  }, {
    dataField: 'artist',
    align: 'center',
    text: 'Artist',
    headerAlign: 'center',
    sort: true,
    style: { cursor: 'pointer' }
  }, {
    dataField: 'delete',
    align: 'center',
    text: 'Delete?',
    headerAlign: 'center',
    formatter: imageFormatter,
    formatExtraData: mySongsArr,
    style: { cursor: 'pointer' }
  }];

  const csvHeaders = [
    { label: 'Song Title', key: 'title' },
    { label: 'Artist', key: 'artist' },    
    { label: 'Album', key: 'album' },
  ];

  const emptyDataMessage = () => { return <div style={{display: 'flex',  justifyContent:'center'}}>No data to display... go add some songs to the playlist!</div>}

  return (
    <PlaylistWrapper>
      <h1>Playlist</h1>
      <BootstrapTable 
          style={{cursor: 'pointer'}}
          noDataIndication={emptyDataMessage}
          keyField='index'
          data={ mySongsArr }
          columns={ columns }
          expandRow={ expandRow }
      />
      <CSVLink data={mySongsArr} headers={csvHeaders}>Export your playlist to a CSV</CSVLink>
    </PlaylistWrapper>
  );
};

export default Playlist;

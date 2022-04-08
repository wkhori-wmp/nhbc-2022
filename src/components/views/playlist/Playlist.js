import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { PlaylistWrapper } from "./Playlist.style";
import { getItems, deleteItem } from "../../../firebase/firebase";
import BootstrapTable from "react-bootstrap-table-next";
import styled from "styled-components";
import { Trash2 } from "react-feather";

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
`;

const Playlist = () => {
  // const classes = useStyles();
  let [mySongsArr, setmySongsArr] = useState([]);

  const getPlaylist = () => {
    getItems().then(function (result) {
      setmySongsArr(
        Object.keys(result).map((item) => ({ ...result[item], id: item }))
      );
    });
  };

  const expandRow = {
    renderer: (row) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <YoutubeVideo
          src={"https://youtube.com/embed/" + row.ytLink.split("?v=")[1]}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></YoutubeVideo>
      </div>
    ),
  };

  // Use effect hook with an empty dependency array [], will run only on mounted
  // This means it will only one the code it contains one time
  useEffect(() => {
    getPlaylist();
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
    getPlaylist();
  };

  const removeSong = (index) => {
    let newSongArr = mySongsArr.filter((a) => a.index !== index);
    setmySongsArr(newSongArr);
  };

  function imageFormatter(cell, row) {
    return (
      <TrashIconWrapper
        style={{ cursor: "pointer" }}
        onClick={() => {
          removeSong(row.index);
        }}
      >
        <Trash2 className="delete-button" />
      </TrashIconWrapper>
    );
  }

  const columns = [
    {
      dataField: "title",
      align: "center",
      text: "Song Title",
      headerAlign: "center",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "artist",
      align: "center",
      text: "Artist",
      headerAlign: "center",
      sort: true,
      style: { cursor: "pointer" },
    },
    {
      dataField: "delete",
      align: "center",
      text: "Delete?",
      headerAlign: "center",
      formatter: imageFormatter,
      formatExtraData: mySongsArr,
      style: { cursor: "pointer" },
    },
  ];

  const csvHeaders = [
    { label: "Song Title", key: "title" },
    { label: "Artist", key: "artist" },
    { label: "Album", key: "album" },
  ];

  const emptyDataMessage = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        No data to display... go add some songs to the playlist!
      </div>
    );
  };

  return (
    <PlaylistWrapper>
      <h1>Playlist</h1>
      <BootstrapTable
        style={{ cursor: "pointer" }}
        noDataIndication={emptyDataMessage}
        keyField="index"
        data={mySongsArr}
        columns={columns}
        expandRow={expandRow}
      />
      <CSVLink data={mySongsArr} headers={csvHeaders}>
        Export your playlist to a CSV
      </CSVLink>
    </PlaylistWrapper>
  );
};

export default Playlist;

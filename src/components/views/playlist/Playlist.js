import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { PlaylistWrapper } from "./Playlist.style";
import {
  getItems,
  deleteItem,
  deletePlaylist,
  getPlaylists,
  setUsername,
  getUsername,
} from "../../../firebase/firebase";
import BootstrapTable from "react-bootstrap-table-next";
import styled from "styled-components";
import { Trash2 } from "react-feather";
import FindPlaylist from "./FindPlaylist";
import { useHistory, useParams } from "react-router-dom";

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
  const history = useHistory();
  const { playlistId } = useParams();
  const [mySongsArr, setMySongsArr] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const username = getUsername();

  console.log(playlistId, username);

  useEffect(() => {
    getPlaylist();
    if (playlistId) {
      getAllPlaylists();
    }
  }, []);

  const getPlaylist = async () => {
    const result = await getItems();
    if (result && Object.keys(result).length > 0) {
      setMySongsArr(
        Object.keys(result).map((item, index) => ({
          ...result[item],
          id: item,
          index: index + 1,
        }))
      );
    } else {
      setMySongsArr([]);
    }
  };

  const getAllPlaylists = async () => {
    const result = await getPlaylists();
    if (result) {
      setPlaylists(
        Object.keys(result).map((playlistName) => ({
          name: playlistName,
          uuid: result[playlistName].uuid,
          songs: Object.values(result[playlistName].playlist),
        }))
      );
      // setMySongsArr(playlists.filter((p) => p.uuid === playlistId).songs);
    } else {
      setPlaylists([]);
    }
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

  const handleDelete = (id) => {
    deleteItem(id);
    getPlaylist();
  };

  const removeSong = async (id) => {
    handleDelete(id);
    let newSongArr = mySongsArr.filter((a) => a.id !== id);
    setMySongsArr(newSongArr);
    if (newSongArr.length === 0) {
      await deletePlaylist(username);
      history.push("/playlist");
    }
  };

  function imageFormatter(cell, row) {
    return (
      <TrashIconWrapper
        style={{ cursor: "pointer" }}
        onClick={() => {
          removeSong(row.id);
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

  // const emptyDataMessage = () => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "600px",
  //       }}
  //     >
  //       No data to display... go add some songs to the playlist!
  //     </div>
  //   );
  // };

  // can add a loading msg or icon here if we want
  // if (mySongsArr?.length < 1) return <></>;
  return (
    <PlaylistWrapper>
      {(mySongsArr?.length < 1 && !playlistId) || !username ? (
        <FindPlaylist getPlaylist={() => getPlaylist()}></FindPlaylist>
      ) : (
        <>
          <h1>{username}</h1>
          <BootstrapTable
            keyField="index"
            data={mySongsArr}
            columns={columns}
            expandRow={expandRow}
          />
          <CSVLink data={mySongsArr} headers={csvHeaders}>
            Export your playlist to a CSV
          </CSVLink>
          <button
            onClick={() => {
              history.push("/playlist");
              setMySongsArr([]);
              setUsername("");
            }}
            style={{ display: "block", marginTop: "20px" }}
          >
            Go Back
          </button>
        </>
      )}
    </PlaylistWrapper>
  );
};

export default Playlist;

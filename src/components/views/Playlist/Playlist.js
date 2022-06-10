/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import { Trash2 } from "react-feather";
import { usePlaylistContext } from "../../core/Providers/PlaylistContext";
import LoadingIcon from "../../core/LoadingIcon/LoadingIcon";
import FindPlaylist from "./FindPlaylist";
import { YoutubeVideo, TrashIconWrapper } from "./Playlist.style";
import { PageWrapper } from "../style";

const Playlist = () => {
  const history = useHistory();
  const {
    loading,
    playlists,
    selectedPlaylist: { name, uuid },
    deletePlaylist,
    deleteSong,
  } = usePlaylistContext();
  const { playlistId } = useParams();
  const [currentPlaylistName, setCurrentPlaylistName] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  useEffect(() => {
    if (playlists) {
      const currPlaylist = playlists.find(
        (playlist) => playlist.uuid === playlistId
      );
      if (currPlaylist) {
        if (currPlaylist.songs && currPlaylist.songs.length !== 0) {
          setCurrentPlaylist(Object.values(currPlaylist.songs) || []);
        }
        if (currPlaylist.name) {
          setCurrentPlaylistName(currPlaylist.name);
        }
      }
    }
  }, [playlists]);

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

  const handleDelete = async (id) => {
    await deleteSong(id);
    // await getPlaylist();
  };

  const removeSong = async (id) => {
    await handleDelete(id);
    const newSongArr = currentPlaylist.filter((a) => a.index !== id);
    setCurrentPlaylist(newSongArr);
    if (newSongArr?.length === 0) {
      deletePlaylist();
      history.push("/playlist");
    }
  };

  function imageFormatter(cell, row) {
    return (
      <TrashIconWrapper
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
      formatExtraData: currentPlaylist,
      style: { cursor: "pointer" },
    },
  ];

  const csvHeaders = [
    { label: "Song Title", key: "title" },
    { label: "Artist", key: "artist" },
    { label: "Album", key: "album" },
  ];

  return (
    <PageWrapper>
      {!playlistId ? (
        <FindPlaylist />
      ) : (
        <>
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <h1>{currentPlaylistName}</h1>
              <BootstrapTable
                keyField="index"
                data={currentPlaylist}
                columns={columns}
                expandRow={expandRow}
                noDataIndication={
                  "No songs to display. Go add some songs to your playlist!"
                }
              />
              <CSVLink data={currentPlaylist} headers={csvHeaders}>
                Export your playlist to a CSV
              </CSVLink>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    history.push("/playlist");
                  }}
                  style={{ marginTop: "10px" }}
                >
                  Go Back
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    deletePlaylist();
                    history.push("/playlist");
                  }}
                  style={{ marginTop: "10px" }}
                >
                  Delete Playlist
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Playlist;

import React, { useEffect, useState } from "react";
import { getUsername, setUsername } from "../../../firebase/firebase";

const FindPlaylist = ({ getPlaylist }) => {
  const [userId, setUserId] = useState(getUsername());

  const handlePlaylistChange = (event) => {
    setUserId(event.target.value);
  };

  const findPlaylist = () => {
    setUsername(userId);
    getPlaylist();
  };

  return (
    <div>
      <h1> Find A Playlist</h1>
      <div style={{ margin: "20px 0" }}>
        Enter the name of your or your friend's playlist to check out the songs!
      </div>
      <label>
        Playlist Name:
        <input
          style={{ marginLeft: "10px" }}
          type="text"
          value={userId}
          name="name"
          onChange={handlePlaylistChange}
        />
      </label>
      <button onClick={findPlaylist} style={{ marginLeft: "30px" }}>
        search
      </button>
    </div>
  );
};

export default FindPlaylist;

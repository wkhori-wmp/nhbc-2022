import Home from "../components/views/Home/Home";
import Playlist from "../components/views/Playlist/Playlist";
import FindPlaylist from "../components/views/Playlist/FindPlaylist";
import AddSong from "../components/views/AddSong/AddSong";

// Route definitions link url paths to components
const routes = [
  {
    component: Home, // Home component will render when path is '/'
    exact: true,
    path: "/",
  },
  {
    component: Playlist,
    exact: true,
    path: "/playlist/:playlistId",
  },
  {
    component: FindPlaylist, // FindPlaylist component will render when path is '/playlist'
    exact: true,
    path: "/playlist",
  },
  {
    component: AddSong, // AddSong component will render when path is '/add-song'
    exact: true,
    path: "/add-song/:playlistId",
  },
  {
    component: AddSong, // AddSong component will render when path is '/add-song'
    exact: true,
    path: "/add-song",
  },
];

export default routes;

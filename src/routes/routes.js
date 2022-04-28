import Home from "../components/views/home";
import Playlist from "../components/views/playlist";
import AddSong from "../components/views/add-song";

// Route definitions link url paths to components
const routes = [
  {
    component: Home, // Home component will render when path is '/'
    exact: true,
    path: "/",
  },
  {
    component: Playlist,
    exact: false,
    path: "/playlist/:playlistId",
  },
  {
    component: Playlist, // Playlist component will render when path is '/playlist'
    exact: true,
    path: "/playlist",
  },
  {
    component: AddSong, // AddSong component will render when path is '/playlist'
    exact: true,
    path: "/add-song",
  },
  {
    component: AddSong, // AddSong component will render when path is '/playlist'
    exact: false,
    path: "/add-song/:playlistId",
  },
];

export default routes;

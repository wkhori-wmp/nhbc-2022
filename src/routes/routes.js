import Home from '../components/views/home';
import Playlist from '../components/views/playlist';
import AddSong from '../components/views/add-song';

// Route definitions link url paths to components
const routes = [
  {
    component: Home, // Home component will render when path is '/'
    exact: true,
    path: '/',
    id: 0,
  },
  {
    component: Playlist, // Playlist component will render when path is '/playlist'
    exact: true,
    path: '/playlist',
    id: 1,
  },
  {
    component: AddSong,
    exact: true,
    path: '/add-song',
    id: 2,
  },
];

export default routes;

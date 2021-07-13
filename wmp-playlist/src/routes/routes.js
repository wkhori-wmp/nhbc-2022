import Home from '../components/views/home';
import Playlist from '../components/views/playlist';
import AddSong from '../components/views/add-song';

const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
    id: 0,
  },
  {
    component: Playlist,
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

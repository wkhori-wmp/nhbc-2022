import React from 'react';
import HomeImage from './logo512.png';

import {
  PageWrapper,
  MainImage,
  Description,
} from './Home.style';

const Home = () => {
  return (
    <PageWrapper>
      <MainImage>
        <img src={HomeImage} alt='Home' width='450' height='450' />
      </MainImage>
      <Description>
        Welcome to WMP Playlist! You can search through song recommendations and
        add your own!
      </Description>
    </PageWrapper>
  );
};

export default Home;

import React, { useState } from 'react';

import {
  PageWrapper,
  MainImage,
  Description,
  DescriptionAndImage,
} from './Home.style';

import { getUsername, setUsermame } from '../../../firebase/firebase';

const Home = () => {

  const [ userId, setUserId ] = useState(getUsername());

  const handleUserChange = (event) => {
    setUserId(event.target.value);
    setUsermame(event.target.value);
  }

  return (
    <PageWrapper>
      <DescriptionAndImage>
      <Description>
        Welcome to WMP Playlist! You can search through song recommendations and
        add your own!
      </Description>
      <form>
        <label>
          Username:
          <input style={{marginLeft: '10px'}}type="text" value={userId} name="name" onChange={handleUserChange} />
        </label>
      </form>
      <MainImage>
        <img
        width={'80%'}
        height={'auto'}
        src={'https://media1.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif?cid=790b76116300152a7031306d98e99a6ed8a6f94d23cddb66&rid=giphy.gif&ct=s'} alt='Home' />
      </MainImage>
      </DescriptionAndImage>
    </PageWrapper>
  );
};

export default Home;

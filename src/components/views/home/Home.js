import React from "react";

import {
  PageWrapper,
  MainImage,
  Description,
  DescriptionAndImage,
} from "./Home.style";

const Home = () => {
  return (
    <PageWrapper>
      <DescriptionAndImage>
        <Description>
          Welcome to WMP Playlist! You can search through song recommendations
          and add your own!
        </Description>
        <MainImage>
          <img
            width={"80%"}
            height={"auto"}
            src={
              "https://media1.giphy.com/media/RJzm826vu7WbJvBtxX/giphy.gif?cid=790b76116300152a7031306d98e99a6ed8a6f94d23cddb66&rid=giphy.gif&ct=s"
            }
            alt="Home"
          />
        </MainImage>
      </DescriptionAndImage>
    </PageWrapper>
  );
};

export default Home;

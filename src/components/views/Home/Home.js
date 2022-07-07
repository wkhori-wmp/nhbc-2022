import React from "react";
import { PageWrapper, Description, DescriptionAndImage } from "./Home.style";

const Home = () => {
  return (
    <PageWrapper>
      <DescriptionAndImage>
        <Description>
          Welcome to WMP Playlist! You can search through song recommendations
          and add your own!
        </Description>
      </DescriptionAndImage>
    </PageWrapper>
  );
};

export default Home;

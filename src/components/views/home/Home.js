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
        <iframe
          title="gif"
          src="https://giphy.com/embed/tqfS3mgQU28ko"
          width="380"
          height="260"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </DescriptionAndImage>
    </PageWrapper>
  );
};

export default Home;

import React from "react";
import HomeImage from "./logo512.png";
//import Typography from "@material-ui/core/Typography";
import {
  Link,
  LinkWrapper,
  PageWrapper,
  Picture,
  Words,
} from "./Playlist.style";

const Home = () => {
  return (
    <div>
      <PageWrapper>
        <Picture>
          <img src={HomeImage} alt="Home Image" width="450" height="450" />
        </Picture>
        <LinkWrapper>
          <Link to="/add-song">Add Song</Link>
          <Link to="/playlist">Playlist</Link>
        </LinkWrapper>
        <Words>
          Welcome to WMP Playlist! You can search through song recommendations
          and add your own!
        </Words>
      </PageWrapper>
    </div>
    //reasoning for using html vs css? Used typography in navbar, why not the styled file?
  );
};

export default Home;

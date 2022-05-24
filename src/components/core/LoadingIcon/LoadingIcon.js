import React from "react";
import { CircularProgress } from "@material-ui/core";
import { LoadingContainer } from "./LoadingIcon.style";

const LoadingIcon = () => {
  return (
    <LoadingContainer>
      <CircularProgress size="8rem" />
    </LoadingContainer>
  );
};

export default LoadingIcon;

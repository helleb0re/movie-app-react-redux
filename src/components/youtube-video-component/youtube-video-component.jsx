import React from "react";

import "./youtube-video-component.css";

const YouTubeVideoComponent = ({ trailerKey, active }) => {
  const srcVideo = active ? `https://www.youtube.com/embed/${trailerKey}` : "";

  return (
    <iframe
      id="ytplayer"
      type="text/html"
      width="100%"
      height="100%"
      src={srcVideo}
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default YouTubeVideoComponent;

import React from "react";
import LinkComponent from "../link-component";

import "./cast-list-item.css";

import unknownImg from "../../images/unknown-user.svg";

const CastListItem = ({ item }) => {
  const { name, character, profile_path, id } = item;

  return (
    <div className="cast-container">
      <LinkComponent to={`/people/${id}`}>
        <img
          className="cast-poster"
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : unknownImg
          }
          alt="actor"
        />
      </LinkComponent>
      <LinkComponent to={`/people/${id}`}>
        <p className="cast-name">{name}</p>
      </LinkComponent>
      <p className="cast-character">{character}</p>
    </div>
  );
};

export default CastListItem;

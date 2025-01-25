import React from "react";
const Moviescard = ({ movie: { Title, Year, Type, Poster, imdbID } }) => {
  return (
    <div className="movie-card">
      <div className="text-white">
        <img src={Poster ? Poster : "./no-movie.png"} alt={Title} />

        <div className="mt-4">
          <h3>{Title}</h3>
          <h4>{Year}</h4>
          <h5>{Type}</h5>
        </div>
      </div>
    </div>
  );
};

export default Moviescard;

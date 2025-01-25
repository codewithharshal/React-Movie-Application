import React from "react";

const Search = ({ searchTerm, setsearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(events) => setsearchTerm(events.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;

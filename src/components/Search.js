import React, { useState } from "react";

function Search({ onSearch }) {
  const [search, setSearch] = useState([]);

  const changeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    onSearch(search);
  };
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search TV" onKeyUp={changeHandler} />
      </div>
    </div>
  );
}

export default Search;

import React, { useState } from "react";

function Search({ onSearch }) {
  const [value, setValue] = useState("");

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='d-flex'>
      <input className='input-group-text w-50 p-lg-0' onChange={valueChangeHandler} value={value} type="text" />
      <button onClick={() => onSearch(value)}>Поиск</button>
    </div>
  );
}

export default Search;

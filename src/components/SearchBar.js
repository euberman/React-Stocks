import React from 'react';

const SearchBar = (props) => {

  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" name="sortTerm" value="Alphabetically" checked={null} onChange={props.handleSort}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" name="sortTerm" value="Price" checked={null} onChange={props.handleSort}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select name="filterTerm" onChange={props.handleFilter}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;

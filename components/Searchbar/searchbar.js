import React from 'react';
import './searchbar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, handleChange, search } = this.props;
    return (
      <div className="searchForm">
        <input
          type="text"
          value={value}
          name="value"
          onChange={handleChange}
          placeholder="Enter Song, Album, Artist..."
          id="searchbar"
        ></input>
        <button onClick={search}>Search</button>
      </div>
    );
  }
}

export default SearchBar;

import React from 'react';
import './searchresults.css';
import TrackList from '../Tracklist/tracklist';

class SearchResults extends React.Component {
  render() {
    const { searchResults, onAdd } = this.props;
    return (
      <div className="resultbox">
        <h1>Results</h1>
        <TrackList searchResults={searchResults} onAdd={onAdd} />
      </div>
    );
  }
}

export default SearchResults;

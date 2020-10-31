import React from 'react';
import Tracks from '../Tracks/tracks';

class TrackList extends React.Component {
  render() {
    const { searchResults, onAdd } = this.props;
    return (
      <div>
        {searchResults.map(
          ({ albumName, artist, release_date, id, name, uri }, index) => {
            return (
              <div key={name + index + id}>
                <Tracks
                  albumName={albumName}
                  artist={artist}
                  name={name}
                  uri={uri}
                  release_date={release_date}
                  id={id}
                  onAdd={onAdd}
                />
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default TrackList;

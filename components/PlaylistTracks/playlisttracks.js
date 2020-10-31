import React from 'react';

class PlaylistTracks extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }
  remove() {
    const { onRemove, id } = this.props;
    onRemove(id);
  }
  render() {
    const { playlist, onRemove } = this.props;
    return (
      <div>
        {playlist.map(({ name, albumName, id, artist, uri }, index) => {
          return (
            <div className="detailLayout" key={name + id + index}>
              <div className="resultdetail">
                <h2>{name}</h2>
                <p>
                  {albumName} - {artist}
                </p>
              </div>
              <div className="addIcon">
                <h2 onClick={() => onRemove(id)}>-</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PlaylistTracks;

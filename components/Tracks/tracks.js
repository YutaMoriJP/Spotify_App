import React from 'react';

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.adding = this.adding.bind(this);
  }
  adding() {
    const { onAdd, name, albumName, id, artist, uri } = this.props;
    const item = { name, albumName, id, artist, uri };
    onAdd(item);
  }
  render() {
    const { albumName, name, id, uri, artist, release_date } = this.props;
    if (id) {
      console.log(id);
      return (
        <div className="detailLayout">
          <div className="resultdetail">
            <h2>{name}</h2>
            <p>
              {albumName} - {artist}
            </p>
          </div>
          <div className="addIcon">
            <h2 onClick={this.adding}>+</h2>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Tracks;

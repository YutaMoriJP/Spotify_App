import React from 'react';
import './playlist.css';
import PlaylistTracks from '../PlaylistTracks/playlisttracks';
import Post from '../Post/post';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      playlist,
      onRemove,
      onPost,
      playlistName,
      handleChange,
    } = this.props;
    return (
      <div className="playlistbox">
        <input
          onChange={handleChange}
          type="text"
          value={playlistName}
          className="playlistinput"
          name="playlistName"
        ></input>
        <PlaylistTracks playlist={playlist} onRemove={onRemove} />
        {playlist.length ? (
          <Post
            playlistName={playlistName}
            playlist={playlist}
            onPost={onPost}
          />
        ) : null}
      </div>
    );
  }
}

export default PlayList;

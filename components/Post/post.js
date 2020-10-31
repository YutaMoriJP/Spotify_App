import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { onPost, playlistName } = this.props;
    onPost(playlistName);
  }
  render() {
    const { playlistName } = this.props;
    return (
      <div>
        <button
          style={{ width: '80%', background: '#00c3e3' }}
          onClick={this.handleClick}
        >
          Add "{playlistName}"
        </button>
      </div>
    );
  }
}

export default Post;

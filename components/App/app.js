import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import SearchBar from '../Searchbar/searchbar';
import SearchResults from '../SearchResults/searchresults';
import PlayList from '../Playlist/playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
      playlistName: 'Default Playlist',
      value: '',
      authorized: false,
    };
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onPost = this.onPost.bind(this);
  }
  onAdd(item) {
    const { playlist } = this.state;
    if (playlist.some(({ id }) => id === item.id)) {
      return;
    } else {
      playlist.push(item);
      this.setState({ playlist: playlist });
    }
  }
  onRemove(itemID) {
    const { playlist } = this.state;
    console.log(itemID);
    const newPlaylist = playlist.filter(({ id }) => id !== itemID);
    this.setState({ playlist: newPlaylist });
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleClick() {
    Spotify.getAccessToken();
    this.setState({ authorized: true });
  }
  search() {
    const { value } = this.state;
    Spotify.search(value).then(data => this.setState({ searchResults: data }));
  }
  onPost(playlistname) {
    const { playlist } = this.state;
    const trackUris = playlist.map(({ uri }) => uri);
    Spotify.addPlaylist(playlistname, trackUris).then(() => {
      this.setState({
        playlist: [],
        playlistName: 'New Playlist',
        searchResults: [],
        value: '',
      });
      document.getElementById('searchbar').focus();
    });
  }
  render() {
    const {
      searchResults,
      playlist,
      value,
      authorized,
      playlistName,
    } = this.state;
    console.log(playlist);
    return (
      <div>
        <nav>
          <h1>Spotify App</h1>
        </nav>
        {authorized ? (
          <div className="searchbar">
            <SearchBar
              search={this.search}
              handleChange={this.handleChange}
              value={value}
            />
          </div>
        ) : (
          <div>
            <h1 style={{ color: 'white' }}>
              Authorize this web app to access your Spotify account details:
            </h1>
            <button onClick={this.handleClick}>Approve</button>
          </div>
        )}
        <div className="results">
          <SearchResults searchResults={searchResults} onAdd={this.onAdd} />
          <PlayList
            playlist={playlist}
            onRemove={this.onRemove}
            onPost={this.onPost}
            playlistName={playlistName}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

const authURL = 'https://accounts.spotify.com/authorize';

const clientID = '2c7815cd90bf4c358ce9705b44a7206b';

const redirectURL = 'http://localhost:1234/';

const fetchURL = 'https://api.spotify.com/v1/search';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log('called');
      return accessToken;
    }
    //checks if the regex operation returns a match or not, if not, then returns null (false)
    const accessTokenMatch = window.location.href.match(/access_token=[^&]*/);
    const expiresInMatch = window.location.href.match(/expires_in=\d*/);
    if (accessTokenMatch && expiresInMatch) {
      //if current url does have a accessToken and expiresIn parameters, then run the following operation
      accessToken = accessTokenMatch.pop().slice('access_token='.length);
      expiresIn = expiresInMatch.pop().slice('expires_in='.length);
      setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `${authURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURL}&scope=user-read-private playlist-modify-private user-top-read`;
    }
  },
  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(`${fetchURL}?q=${searchTerm}&type=track`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(
          ({
            album: { name: albumName, release_date },
            artists: [{ name: artist }],
            id,
            name,
            uri,
          }) => ({
            albumName,
            artist,
            release_date,
            id,
            name,
            uri,
          })
        );
      });
  },
  addPlaylist(playlistName, trackUris) {
    let userID;
    let playlistID;
    const bodyData = { name: playlistName, public: false };
    const accessTokenPost = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessTokenPost}` },
    })
      .then(response => response.json())
      .then(jsonResponse => {
        userID = jsonResponse.id;
      })
      .then(() => {
        console.log(accessTokenPost);
        console.log(userID);
        if (accessTokenPost && userID) {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessTokenPost}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
          });
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        playlistID = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessTokenPost}`,
            },
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      })
      .catch(error => console.log(`the error is ${error}`));
  },
};

export default Spotify;

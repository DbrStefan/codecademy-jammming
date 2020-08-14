const clientId = "713efe5f55aa4d5f89be39d96c2bc8b3";
const redirectURI = "http://localhost:3000/";

let accessToken = '';

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    console.log(accessTokenMatch);
    console.log(expiresInMatch);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(searchTerm) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
          if(!jsonResponse.tracks){
              return []
          } else {
              return jsonResponse.tracks.map((track)=>{
                return {
                    ID: track.id,
                    Name: track.name,
                    Artist: track.artist[0].name,
                    Album: track.album.name,
                    URI: track.uri
                }
              })
          }
      });
  },
};

export default Spotify;
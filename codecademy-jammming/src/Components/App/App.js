import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

 
  savePlaylist() {
    let tracksURIs = [];
    this.state.playlistTracks.forEach((element) => {
      tracksURIs.push(element.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, tracksURIs);
    this.setState({
      playlistTracks: [],
      playlistName: 'New Playlist',
      searchResults: [],
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((trackInList) => {
        return trackInList.id === track.id;
      })
    ) {
      return;
    } else {
      let playlistTracksArray = this.state.playlistTracks;
      playlistTracksArray.push(track);
      this.setState({ playlistTracks: playlistTracksArray });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((trackIndex) => {
        return trackIndex.id !== track.id;
      }),
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then((tracks) =>{
      let filteredArray = []
      tracks.forEach((track) => {
        if(!this.state.playlistTracks.find(el=>el.id === track.id)) {
          filteredArray.push(track);
        }
      })
      this.setState({ searchResults: filteredArray })}
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              playlist={this.state.playlistTracks}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

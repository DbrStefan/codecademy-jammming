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
      searchResults: [
             ],
      playlistName: 'Test Playlist',
      playlistTracks: [
        {
          name: 'Cine e cu noi',
          artist: 'Bug mafia',
          album: 'Dupa Blocuri',
          id: 7742,
        },
        {
          name: 'Sa ma apuci de un coi',
          artist: 'Bug mafia',
          album: 'Dupa Blocuri',
          id: 7799,
        },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    
  }

  savePlaylist(array){
    let tracksURIs = [];
    array.forEach(element => { tracksURIs.push(element.uri)      
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((trackInList) => {
        return trackInList.id === track.id;
      })
    ) {
      return;
    } else {
      this.setState(this.state.playlistTracks.push(track));
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((trackIndex) => {
        return trackIndex.id !== track.id;
      }),
    });
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(tracks => this.setState({searchResults: tracks}));
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
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

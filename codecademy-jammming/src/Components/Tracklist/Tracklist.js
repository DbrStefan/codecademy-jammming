import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js'

class Tracklist extends React.Component {
  render() {
    return (<div className="TrackList">
        <Track />
    </div>)
  }
}

export default Tracklist;
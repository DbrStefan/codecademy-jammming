import React from 'react';
import './sound.css';

class Sound extends React.Component {
  render() {
    return (
      <div className="soundComponent">
        <audio
          controls
          src={this.props.url}
        />
      </div>
    );
  }
}

export default Sound;

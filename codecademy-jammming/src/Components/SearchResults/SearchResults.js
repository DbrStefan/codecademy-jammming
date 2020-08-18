import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist.js";

class SearchResults extends React.Component {
  // constructor(props){
  //   super(props);

  //   this.filterTracks = this.filterTracks.bind(this);
  // }
  
  // filterTracks() {
  //   let filteredArray = [];
  //   this.props.searchResults.forEach(element => {
  //     if (!this.props.playlist.includes(element)){
  //       filteredArray.push(element);
  //     }
  //   });  
  //   return filteredArray;
  // }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
        
      </div>
    );
  }
}

export default SearchResults;

import React, { Component } from "react";
import YouTube from "react-youtube";
import PlaylistService from '../services/PlaylistService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';


class PlaylistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      currentIndex: props.playlist.indexOfLastVideoWatched,
    };
    this.onEnd = this.onEnd.bind(this);
    this.getTotalVideosWatched = this.getTotalVideosWatched.bind(this);

  }

  onEnd(event) {
    var currentVideos = this.state.videos;
    //console.log(currentVideos)
    currentVideos[this.state.currentIndex].videoWatched = true;
    console.log(currentVideos)
    let updatedPlaylist = this.props.playlist
    //updatedPlaylist.videos = currentVideos
    console.log(updatedPlaylist)
    PlaylistService.updatePlaylist(updatedPlaylist,this.props.playlist.id)
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  }


  componentDidMount() {
    this.setState({ videos: this.props.playlist.videoList });
  }

  getTotalVideosWatched(videos){

    let videosWatched = 0;
    videos.map(video =>{
        videosWatched += video.videoWatched
    })

    return videosWatched;
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <div>
        <h2 className="text-center">{this.props.playlist.title ? this.props.playlist.title : "Playlist"}</h2>
        <div class="row">
          <div class="col">
            <YouTube
              videoId={this.props.playlist.videoList[this.state.currentIndex].videoUrl}
              opts={opts}
              onReady={this._onReady}
              onEnd={this.onEnd}
            />
          </div>
          <div class="col">
    <h5 className="text-center">Progress: {this.getTotalVideosWatched(this.props.playlist.videoList)}/{this.props.playlist.length}</h5>
            <ul class="list-group video-list">
              {this.props.playlist.videoList.map((video,index) => {
                return (
                  <li
                    key={video.videoId}
                    onClick={this.onPlayerStateChange}
                    class="list-group-item"
                    onClick={()=>{  this.setState({currentIndex:index }); var updatedPlaylist = this.props.playlist; updatedPlaylist.indexOfLastVideoWatched = index; PlaylistService.updateIndexOfLastVideoWatched(updatedPlaylist, this.props.playlist.id)}}
                  >
                    {video.videoTitle} <span style={{'float':'right', "color": 'green','fontSize': "20px"}}>{video.videoWatched ? <FontAwesomeIcon icon={faCheckSquare} /> : ""}</span> 
                    
                   
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistComponent;

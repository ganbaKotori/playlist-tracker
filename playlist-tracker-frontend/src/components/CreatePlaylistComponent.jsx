import React, { Component } from "react";
import PlaylistService from "../services/PlaylistService";
import axios from "axios";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

class CreatePlaylistComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {  
      url: "",
      length: "",
      numOfVideosCompleted: null,
      indexOfLastVideoWatched: null,
      author: "",
      title: "",
      videoList: [
        {
          videoUrl: "",
        },
      ],
    };

    this.changeUrlHandler = this.changeUrlHandler.bind(this);
    this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
  }


  changeUrlHandler = (event) => {
    this.setState({ url: event.target.value });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeAuthorHandler = (event) => {
    this.setState({ author: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails&maxResults=25&playlistId=${this.state.url}&key=AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        const playlist = res.data;

        var videoList = [];

        playlist.items.map((item) => {
          const { id, snippet = {} } = item;
          const { title, thumbnails = {}, resourceId } = snippet;
          const { medium = {} } = thumbnails;
          videoList.push({
            videoUrl: resourceId.videoId,
            videoTitle: title,
            videoWatched: false
          });
        });

        let playlistClass = {
          title : this.state.title,
          url: this.state.url,
          length: playlist.items.length,
          numOfVideosCompleted: 0,
          indexOfLastVideoWatched: 0,
          author: this.state.author,
          videoList: videoList,
        };
        console.log(playlistClass);
        PlaylistService.createPlaylist(playlistClass).then((res) => {
          console.log(res.data);
        });
      });
  };

  render() {
    return (
      <div>
        <h2>Add Playlist</h2>

        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label for="exampleInputEmail1">Playlist Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Name the playlist"
              value={this.state.title}
              onChange={this.changeTitleHandler}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">YouTube Playlist URL</label>
            <input
              type="text"
              class="form-control"
              id="url"
              placeholder="Paste your url here"
              value={this.state.url}
              onChange={this.changeUrlHandler}
            />
            <small id="emailHelp" class="form-text text-muted">
              Copy and paste from the browser
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter your name</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              placeholder="John Doe"
              value={this.state.author}
              onChange={this.changeAuthorHandler}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylistComponent;

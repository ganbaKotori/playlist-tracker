import React from "react";
import "./App.css";
import youtube from "./api/youtube";
import axios from 'axios';
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListPlaylistComponent from './components/ListPlaylistComponent'
import PlaylistComponent from './components/PlaylistComponent'
import CreateEmployeeComponent from './components/CreateEmployeeComponent'
import CreatePlaylistComponent from './components/CreatePlaylistComponent'

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistId: "",
      videos: null,
      selectedVideo: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLqm_9g6cXMt3_t1ESR9K3YQCcT9SzEOeE&key=[YOUR_API_KEY] HTTP/1.1

  getServerSideProps = async () => {
    const res = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails&maxResults=25&playlistId=PL8-8KNzcOW5oCgm_ibo0bVPQ1PHJLZ4-H&key=AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII`
    );
    const data = await res.json();
    console.log(data);
    this.setState({ videos: data });
    return {
      props: {
        data,
      },
    };
  };

  componentDidMount = () => {
    //this.getServerSideProps();
  };

  handleChange(event) {
    this.setState({ playlistId: event.target.value });
  }

  /*handleSubmit = async (event) => {
    alert(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails&maxResults=25&playlistId=${this.state.value}&key=AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII`)
    this.getServerSideProps();
    const res2 = await axios.create({
      baseURL: `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails&maxResults=25&playlistId=${this.state.value}&key=AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII`,
  })

    const data = await res2.json();
    console.log(data);
    alert("test")
    this.setState({ videos: data });
    event.preventDefault();
  };*/

  handleSubmit = event => {
    event.preventDefault();

    axios.get(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails&maxResults=25&playlistId=${this.state.playlistId}&key=AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII`)
      .then(res=>{
        
        console.log(res);
        console.log(res.data);
        this.setState({ videos: res.data });
      })
  }

  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };



  render() {

    if (this.state.videos !== null) {
      return (
        <div className="ui container" style={{ marginTop: "1em" }}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ul>
            {this.state.videos.items.map((item) => {
              const { id, snippet = {} } = item;
              const { title, thumbnails = {}, resourceId } = snippet;
              const { medium = {} } = thumbnails;
              return (
                <li key={id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                  >
                    <p>
                      <img
                        width={medium.width}
                        height={medium.height}
                        src={medium.url}
                        alt=""
                      />
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
          hi
        </div>
      );
    } else
      return (
        <div>
          <header>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-brand">Playlist Tracker</div>
              </nav>
          </header>
        <div className="container" style={{ marginTop: "1em" }}>
          <CreatePlaylistComponent/>
          <ListPlaylistComponent/>
          
        </div>
        <footer className="footer">
          <span className="text-muted">Created by Alexander Ramirez</span>
        </footer>
        </div>
      );
  }
}

export default App;

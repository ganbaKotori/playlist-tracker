import React, { Component} from 'react'
import PlaylistService from '../services/PlaylistService'
import PlaylistComponent from './PlaylistComponent'


class ListPlaylistComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            playlists: []
        }
    }

    componentDidMount(){
        PlaylistService.getPlaylists().then(res => {
            console.log(res.data)
            this.setState({playlists: res.data})
        })
    }

    getTotalVideosWatched(videos){

        let videosWatched = 0;
        videos.map(video =>{
            videosWatched += video.videoWatched
        })
    
        return videosWatched;
      }

    render(){
        return(
            <div>
                <h2 className="text-center">Playlists</h2>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Playlist Title</th>
                                    <th>Playlist Url</th>
                                    <th>Progress</th>
                                    <th>Playlist Author</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                    this.state.playlists.map(playlist => {
                        return(
                        <tr key={playlist.id}>
                            <td>{playlist.title ? playlist.title : "No title available"}</td>
                            <td><a href={`https://www.youtube.com/playlist?list=${playlist.url}`}>Link</a></td>
                            <td> {this.getTotalVideosWatched(playlist.videoList)}/{playlist.length}</td>
                            <td> {playlist.author}</td>
                            <td> <button type="submit" class="btn btn-primary">
            View
          </button></td>
                        </tr>
                        )
                    
                    })
                }
                            </tbody>
                        </table>
                    </div>

                    {
                    this.state.playlists ? this.state.playlists.map(playlist => {
                        return(
                            <PlaylistComponent playlist={playlist} />
                        )
                    
                    }) : ""
                }
        

            </div>
        )
    }
}


export default ListPlaylistComponent
import axios from 'axios'

const PLAYLIST_API_BASE_URL = "http://localhost:8081/api/v1/playlists"

class PlaylistService {

    getPlaylists(){
        return axios.get(PLAYLIST_API_BASE_URL)
    }

    createPlaylist(playlist){
        return axios.post(PLAYLIST_API_BASE_URL, playlist)
    }

    updatePlaylist(playlist, playlistId){
        return axios.put(PLAYLIST_API_BASE_URL + '/' + playlistId, playlist)
    }

    updateIndexOfLastVideoWatched(playlist, playlistId){
        return axios.put(PLAYLIST_API_BASE_URL + '/last-video/' + playlistId, playlist)
    }

}

export default new PlaylistService()
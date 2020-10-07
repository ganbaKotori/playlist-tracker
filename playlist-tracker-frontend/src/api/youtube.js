import axios from 'axios';
const KEY = 'AIzaSyDz2i-r_qeYLZ5k4VnWQAnz9Y5g2Y-gIII';

export default axios.create({
    baseURL: 'http://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})
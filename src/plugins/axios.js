import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDMyZjIxYWZjMjFmNWEwMTBiMmEyYjVmZTBmYWVlNiIsIm5iZiI6MTc1OTI1MjA4NC41NzksInN1YiI6IjY4ZGMwZTc0OTUwYTUxMTEwYWM3NmY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iCrH0giesdGUiEjH1HNqQQ0OyKyW3dkc-fQO6j4LI4`,
    }

});
export default api;
import React, { useState } from 'react';  
import axios from 'axios';  

const YouTubeSearch = () => {  
    const [query, setQuery] = useState('');  
    const [videos, setVideos] = useState([]);  

    const API_KEY = 'AIzaSyBFXsb8mxRCySRQmHL_9C0DUIu-r35KwM4'; 

    const handleSearch = async () => {  
        try {  
            const response = await axios.get(  
                `https://www.googleapis.com/youtube/v3/search`, {  
                    params: {  
                        part: 'snippet',  
                        q: query,  
                        key: API_KEY,  
                    }  
                }  
            );  
            setVideos(response.data.items); // Set the videos state with the results  
        } catch (error) {  
            console.error('Error fetching data from YouTube API', error);  
        }  
    };  

    return (  
        <div>  
            <h1>YouTube Video Search</h1>  
            <input  
                type="text"  
                value={query}  
                onChange={(e) => setQuery(e.target.value)}  
                placeholder="Search for videos..."  
            />  
            <button onClick={handleSearch}>Search</button>  
            <div>  
                {videos.map(video => (  
                    <div key={video.id.videoId}>  
                        <h2>{video.snippet.title}</h2>  
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />  
                        <p>{video.snippet.description}</p>  
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
};  

export default YouTubeSearch;
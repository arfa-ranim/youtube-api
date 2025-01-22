import React, { useState } from "react";  
import axios from "axios"; 
import YouTubeSearch from "./components/YouTubeSearch";

export default function App() {  
    const [videos, setVideos] = useState([]);  
    const [query, setQuery] = useState("");  // State for search query  
    const [loading, setLoading] = useState(false);  

    const API_KEY = 'YAIzaSyBFXsb8mxRCySRQmHL_9C0DUIu-r35KwM4';

    const searchVideos = async () => {  
        if (!query) return;
            setLoading(true);  
        try {  
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {  
                params: {  
                    part: 'snippet',  
                    q: query,
                    key: API_KEY,  
                }  
            });  
            setVideos(response.data.items); // Update state with fetched videos  
        } catch (error) {  
            console.error('Error fetching videos:', error);  
        } finally {  
            setLoading(false);  
        }  
    };  

    return (  
        <div className="max-w-7xl mx-auto my-10 flex flex-col items-center w-full gap-10">  
            <input  
                className="border-slate-800 border-2 p-2"  
                placeholder="search..."  
                value={query} 
                onChange={(e) => setQuery(e.target.value)} // Update query state on change  
            />  
            <button onClick={searchVideos} className="border-2 border-blue-500 p-2">  
                Search  
            </button>  
            {loading ? ( // Displaying loading text 
                <p>Loading...</p> ) : (  
                <ul className="flex w-full flex-wrap gap-10">  
                    {videos.map((video) => (  
                        <li key={video.id.videoId} className="rounded-md shadow-sm w-1/5">  
                            <img  
                                src={video.snippet.thumbnails.default.url} // Thumbnail URL  
                                alt={video.snippet.title}  
                                className="w-full aspect-video"  />  
                            <p>{video.snippet.title}</p> {}  
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
}
import React, { useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import useSpotify from './hooks/useSpotify';
import TopSongs from './components/TopSongs';
import Queue from './components/Queue';
import PriorityQueue from './utils/priorityQueue';

const App = () => {
    const clientId = process.env.REACT_APP_API_URL;
    const redirectUri = process.env.REACT_APP_API_KEY;
    const songs = useSpotify(clientId, redirectUri);
    const [queue, setQueue] = useState(new PriorityQueue());

    const addSong = (song, priority) => {
        const newQueue = new PriorityQueue();
        newQueue.queue = [...queue.queue];
        newQueue.enqueue(song, priority);
        setQueue(newQueue);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex items-center mb-6">
                <FaSpotify className="text-green-500 w-12 h-12 mr-4" />
                <h1 className="text-3xl font-bold">Spotify</h1>
            </div>
            <div className="flex flex-wrap">
                <TopSongs songs={songs} addSong={addSong} />
                <Queue queue={queue} setQueue={setQueue} />
            </div>
        </div>
    );
};

export default App;
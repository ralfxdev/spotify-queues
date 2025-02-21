import React, { useState } from 'react';
import { FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Song = ({ song, addSong }) => {
    const [priority, setPriority] = useState(1);

    const handleAddSong = () => {
        addSong(song, priority);
    };

    const increasePriority = () => {
        setPriority((prevPriority) => Math.min(prevPriority + 1, 12));
    };

    const decreasePriority = () => {
        setPriority((prevPriority) => Math.max(prevPriority - 1, 1));
    };

    if (!song || !song.album || !song.album.images || !song.album.artists) {
        return null;
    }

    return (
        <div className="flex flex-col items-center p-4 border border-gray-800 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-900 text-white">
            <img src={song.album.images[0].url} alt={song.name} className="w-48 h-48 object-cover mb-4" />
            <div className="text-center w-full overflow-hidden">
                <h3 className="text-lg font-semibold mb-1 truncate">{song.name}</h3>
                <p className="text-gray-400">{song.album.artists[0].name}</p>
            </div>
            <div className="flex items-center mt-4">
                <button onClick={decreasePriority} className="mr-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700">
                    <FaArrowDown />
                </button>
                <span className="text-lg">{priority}</span>
                <button onClick={increasePriority} className="ml-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700">
                    <FaArrowUp />
                </button>
                <button
                    className="ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center"
                    onClick={handleAddSong}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default Song;
import React from 'react';
import Song from './Song';

const TopSongs = ({ songs, addSong }) => {
    return (
        <div className="w-full lg:w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-4">Top Canciones</h2>
            <div className="flex flex-wrap gap-4">
                {songs.map((song, index) => (
                    <Song key={index} song={song} addSong={addSong} />
                ))}
            </div>
        </div>
    );
};

export default TopSongs;
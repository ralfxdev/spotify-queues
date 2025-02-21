import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PriorityQueue from '../utils/priorityQueue';

const Queue = ({ queue, setQueue }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [previousSongs, setPreviousSongs] = useState([]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                if (!queue.isEmpty()) {
                    if (currentSong) {
                        setPreviousSongs(prev => [...prev, currentSong]);
                    }
                    const nextSong = queue.dequeue();
                    setCurrentSong(nextSong);
                } else {
                    setIsPlaying(false);
                    setCurrentSong(null);
                }
            }, 10000);
        }

        return () => clearInterval(interval);
    }, [isPlaying, queue, currentSong]);

    useEffect(() => {
        if (!isPlaying && !queue.isEmpty() && !currentSong) {
            const nextSong = queue.dequeue();
            setCurrentSong(nextSong);
            setQueue(new PriorityQueue([...queue.queue]));
            setIsPlaying(true);
        }
    }, [queue, isPlaying, currentSong, setQueue]);

    const handlePlayPause = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const handleNext = () => {
        if (!queue.isEmpty()) {
            if (currentSong) {
                setPreviousSongs(prev => [...prev, currentSong]);
            }
            const nextSong = queue.dequeue();
            setCurrentSong(nextSong);
        }
    };

    const handlePrevious = () => {
        if (previousSongs.length > 0) {
            const previousSong = previousSongs[previousSongs.length - 1];
            
            if (currentSong) {
                const newQueue = new PriorityQueue();
                newQueue.enqueue(currentSong.song, currentSong.priority);
                queue.queue.forEach(item => {
                    newQueue.enqueue(item.song, item.priority);
                });
                setQueue(newQueue);
            }
            setCurrentSong(previousSong);
            setPreviousSongs(prev => prev.slice(0, -1));
        }
    };

    const handleRemove = (index) => {
        const newQueue = new PriorityQueue();
        const currentQueue = [...queue.queue];
        currentQueue.splice(index, 1);
        currentQueue.forEach(item => {
            newQueue.enqueue(item.song, item.priority);
        });
        setQueue(newQueue);
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            const newQueue = new PriorityQueue();
            const currentQueue = [...queue.queue];
            
            const temp = currentQueue[index];
            currentQueue[index] = currentQueue[index - 1];
            currentQueue[index - 1] = temp;
            
            currentQueue.forEach(item => {
                newQueue.enqueue(item.song, item.priority);
            });
            
            setQueue(newQueue);
        }
    };

    const handleMoveDown = (index) => {
        if (index < queue.queue.length - 1) {
            const newQueue = new PriorityQueue();
            const currentQueue = [...queue.queue];
            
            const temp = currentQueue[index];
            currentQueue[index] = currentQueue[index + 1];
            currentQueue[index + 1] = temp;
            
            currentQueue.forEach(item => {
                newQueue.enqueue(item.song, item.priority);
            });
            
            setQueue(newQueue);
        }
    };

    return (
        <div className="w-full lg:w-1/3 p-4">
            <h2 className="text-2xl font-bold mb-4">Cola de Reproducción</h2>
            {currentSong && (
                <div className="mb-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800 text-white">
                    <h3 className="text-xl font-semibold mb-2">Reproduciendo ahora:</h3>
                    <div className='gap-x-4 flex flex-col items-center'>
                        <img src={currentSong.song.album.images[0].url} alt={currentSong.song.name} className="w-36 h-36 object-cover rounded-lg" />
                        <span className='flex flex-col justify-center items-center'>
                            <p className='text-lg font-semibold'>{currentSong.song.name}</p>
                            <p className='text-gray-400'>{currentSong.song.album.artists[0].name}</p>
                        </span>
                    </div>
                    <div className="flex justify-center mt-4 gap-x-4">
                        <button 
                            className="mx-2 hover:text-blue-500 transition-colors" 
                            onClick={handlePrevious}
                            disabled={previousSongs.length === 0}
                        >
                            <FaBackward size={24} className={previousSongs.length === 0 ? 'opacity-50' : ''} />
                        </button>
                        <button 
                            className="mx-2 hover:text-blue-500 transition-colors" 
                            onClick={handlePlayPause}
                        >
                            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                        </button>
                        <button 
                            className="mx-2 hover:text-blue-500 transition-colors" 
                            onClick={handleNext}
                            disabled={queue.isEmpty()}
                        >
                            <FaForward size={24} className={queue.isEmpty() ? 'opacity-50' : ''} />
                        </button>
                    </div>
                </div>
            )}
            <div>
                <h3 className="text-xl font-semibold mb-2">Siguiente en la cola:</h3>
                <ul>
                    {queue.mostrar().map((song, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-700 rounded-lg shadow-md bg-gray-800 text-white flex justify-between items-center">
                            <div className='gap-x-4 flex items-center'>
                                <div className='flex items-center justify-center'>
                                    <img src={song.album.images[0].url} alt={song.name} className="w-16 h-16 object-cover rounded-lg" />
                                </div>
                                <span className='flex flex-col'>
                                    <p className='text-lg font-semibold truncate'>
                                        {song.name}
                                    </p>
                                    <p className='text-gray-400'>
                                        {song.album.artists[0].name}
                                    </p>
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <button 
                                    onClick={() => handleMoveUp(index)} 
                                    className="mx-1 hover:text-blue-500 transition-colors"
                                    disabled={index === 0}
                                >
                                    <FaArrowUp size={16} className={index === 0 ? 'opacity-50' : ''} />
                                </button>
                                <button 
                                    onClick={() => handleMoveDown(index)} 
                                    className="mx-1 hover:text-blue-500 transition-colors"
                                    disabled={index === queue.queue.length - 1}
                                >
                                    <FaArrowDown size={16} className={index === queue.queue.length - 1 ? 'opacity-50' : ''} />
                                </button>
                                <button 
                                    onClick={() => handleRemove(index)} 
                                    className="mx-1 hover:text-red-500 transition-colors"
                                >
                                    <FaTrashAlt size={16} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Queue;
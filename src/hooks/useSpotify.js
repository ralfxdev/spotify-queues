import { useEffect, useState } from 'react';

const useSpotify = (clientId, redirectUri) => {
    const [songs, setSongs] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const storedToken = localStorage.getItem('spotify_access_token');
            if (storedToken) {
                setToken(storedToken);
                return;
            }

            const params = new URLSearchParams(window.location.hash.replace('#', '?'));
            const accessToken = params.get('access_token');

            if (accessToken) {
                localStorage.setItem('spotify_access_token', accessToken);
                setToken(accessToken);
            } else {
                requestAuthorization();
            }
        };

        const requestAuthorization = () => {
            const scopes = 'user-top-read';
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
            window.location.href = authUrl;
        };

        getToken();
    }, [clientId, redirectUri]);

    useEffect(() => {
        if (!token) return;

        const fetchTopSongs = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=12', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.status === 401) {
                    localStorage.removeItem('spotify_access_token');
                    requestAuthorization();
                    return;
                }
                
                const data = await response.json();
                setSongs(data.items || []);
            } catch (error) {
                console.error('Error fetching top songs:', error);
            }
        };

        fetchTopSongs();
    }, [token]);

    return songs;
};

export default useSpotify;

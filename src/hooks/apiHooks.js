import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const mediaItems = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

                const mediaWithUsernames = await Promise.all(
                    mediaItems.map(async (item) => {
                        try {
                            const userData = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
                            return { ...item, username: userData.username };
                        } catch (error) {
                            return { ...item, username: 'Unknown User' };
                        }
                    })
                );

                setMediaArray(mediaWithUsernames);
            } catch (error) {
                console.error('useMedia failed:', error.message);
            }
        };

        getMedia();
    }, []);

    return { mediaArray };
};

const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    };
    return { postLogin };
};

const useUser = () => {
    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: { Authorization: 'Bearer ' + token },
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
    };

    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
    };

    return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
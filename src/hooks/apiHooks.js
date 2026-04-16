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
                            // eslint-disable-next-line no-unused-vars
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

    const postMedia = async (fileData, inputs, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
                title: inputs.title,
                description: inputs.description,
                filename: fileData.filename,
                media_type: fileData.media_type,
            }),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media', fetchOptions);
    };

    return { mediaArray, postMedia };
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

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        };
        return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', fetchOptions);
    };
    return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
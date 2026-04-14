import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';
import MediaRow from '../components/MediaRow';

const Home = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {

                const medUrl = import.meta.env.VITE_MEDIA_API + '/media';
                const medItems = await fetchData(medUrl);


                const mediaWithUsernames = await Promise.all(
                    medItems.map(async (item) => {
                        try {
                            const useUrl = import.meta.env.VITE_AUTH_API + '/users/' + item.user_id;
                            const useData = await fetchData(useUrl);

                            return { ...item, username: useData.username };
                        } catch (error) {

                            console.warn(`Käyttäjää id:llä ${item.user_id} ei löytynyt`);
                            return { ...item, username: 'Unknown User' };
                        }
                    })
                );


                setMediaArray(mediaWithUsernames);
                console.log('Media ja käyttäjät haettu:', mediaWithUsernames);
            } catch (error) {
                console.error('Media failed:', error.message);
            }
        };

        getMedia();
    }, []);

    return (
        <div>
            <h1>Media Gallery</h1>
            <div>
                {mediaArray.map((item) => (

                    <MediaRow key={item.media_id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Home;
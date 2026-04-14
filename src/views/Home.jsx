import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';
import MediaRow from '../components/MediaRow';

const Home = () => {

    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {

                const json = await fetchData('test.json');
                setMediaArray(json);
                console.log('Media haettu:', json);
            } catch (error) {
                console.error('getMedia failed:', error.message);
            }
        };

        getMedia();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Home View</h1>
            <div className="grid gap-4">
                {mediaArray.map((item) => (

                    <MediaRow key={item.media_id || item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Home;
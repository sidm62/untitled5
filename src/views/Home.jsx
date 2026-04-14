import { useMedia } from '../hooks/apiHooks';
import MediaRow from '../components/MediaRow';

const Home = () => {
    const { mediaArray } = useMedia();

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
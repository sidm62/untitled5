import { useLocation, useNavigate } from 'react-router';
import Likes from '../components/Likes';

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    if (!item) {
        return (
            <div>
                <p>No item found</p>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        );
    }

    return (
        <article>
            <button onClick={() => navigate(-1)}>Go back</button>

            <header>
                <h2>{item.title}</h2>
                <p>Owner: {item.username}</p>
            </header>

            <div>
                <img
                    src={item.filename || item.url}
                    alt={item.title}
                />
            </div>

            <section>
                <p>{item.description}</p>
                <Likes item={item} />
            </section>

            <footer>
                <span>Type: {item.media_type}</span>
            </footer>
        </article>
    );
};

export default Single;
import { Link } from 'react-router';

const MediaRow = ({ item }) => {
    return (
        <div>
            <div>

                <img
                    src={item.thumbnail || item.url}
                    alt={item.title}
                />
                <div>
                    <h3>{item.title}</h3>
                    <p {item.media_type}></p>
                </div>
            </div>

            <Link
                to="/single"
                state={{ item }}
            >
                Show
            </Link>
        </div>
    );
};

export default MediaRow;
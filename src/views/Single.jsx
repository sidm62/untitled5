import { useLocation, useNavigate } from 'react-router';

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    if (!item) return <div>No item found</div>;

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
            >
                Go back
            </button>

            <h2>{item.title}</h2>
            {item.media_type.includes('image') ? (
                <img src={item.url} alt={item.title} />
            ) : (
                <video src={item.url} controls/>
            )}
            <p>{item.description}</p>
        </div>
    );
};

export default Single;
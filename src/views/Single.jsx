import { useLocation, useNavigate } from 'react-router';

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    if (!item) return <div>No item found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                className="mb-4 bg-zinc-700 p-2 rounded"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>

            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            {item.media_type.includes('image') ? (
                <img src={item.url} alt={item.title} className="w-full rounded" />
            ) : (
                <video src={item.url} controls className="w-full rounded" />
            )}
            <p className="mt-4">{item.description}</p>
        </div>
    );
};

export default Single;
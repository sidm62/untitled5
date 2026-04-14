import { Link } from 'react-router';

const MediaRow = ({ item }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-lg mb-3 shadow-sm hover:border-zinc-500 transition-colors">
            <div className="flex items-center gap-4">

                <img
                    src={item.thumbnail || item.url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md bg-zinc-700"
                />
                <div>
                    <h3 className="font-bold text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.media_type}</p>
                </div>
            </div>

            <Link
                to="/single"
                state={{ item }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
                Show
            </Link>
        </div>
    );
};

export default MediaRow;
import { Link } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const MediaRow = ({ item }) => {
    const { user } = useUserContext();

    return (
        <div>
            <div>
                <img
                    src={item.thumbnail || item.url}
                    alt={item.title}
                />
                <div>
                    <h3>{item.title}</h3>
                    <p>
                        By: <span>{item.username}</span>
                    </p>
                    <p>{item.media_type}</p>
                </div>
            </div>

            <div>

                <Link
                    to="/single"
                    state={{ item }}
                >
                    Show
                </Link>


                {user && (user.user_id === item.user_id || user.level_name === 'Admin') && (
                    <>
                        <button
                            onClick={() => console.log("modify", item)}
                        >
                            Modify
                        </button>
                        <button
                            onClick={() => console.log("delete", item)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MediaRow;
import { useEffect, useState, useCallback } from 'react'; // Muista lisätä useCallback tänne
import { useLike } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Likes = ({ item }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [userLike, setUserLike] = useState(null);
    const { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser } = useLike();
    const { user } = useUserContext();

    const currentId = item?.file_id || item?.media_id || item?.id;


    const fetchLikes = useCallback(async () => {
        if (!currentId) return;

        try {
            const countResponse = await getLikeCountByMediaId(currentId);
            setLikeCount(countResponse.count);

            const token = localStorage.getItem('token');
            if (user && token) {
                const userLikeResponse = await getLikeByUser(currentId, token);
                setUserLike(userLikeResponse);
            }
        } catch (error) {
            console.error('fetchLikes failed:', error.message);
        }
    }, [currentId, user, getLikeCountByMediaId, getLikeByUser]);


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLikes();
    }, [fetchLikes]);

    const handleLike = async () => {
        if (!currentId) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            if (userLike) {
                // Poistetaan tykkäys
                await deleteLike(userLike.like_id, token);
                setUserLike(null);
            } else {
                // Lisätään tykkäys
                await postLike(currentId, token);
            }

            // Päivitetään tilanne palvelimelta
            await fetchLikes();
        } catch (error) {
            console.error('handleLike failed:', error.message);
        }
    };

    if (!currentId) return null;

    return (
        <div className="flex items-center gap-4 py-4">
            <span className="font-bold text-white">
                {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </span>
            {user && (
                <button
                    onClick={handleLike}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                >
                    {userLike ? '❤️ Liked' : '🤍 Like'}
                </button>
            )}
        </div>
    );
};

export default Likes;
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
    const [user, setUser] = useState(null);
    const { getUserByToken } = useUser();

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getUserByToken(token);
                    setUser(userData.user); // Huom: API saattaa palauttaa { user: {...} }, tarkista tämä
                } catch (error) {
                    console.error('Profile fetch failed:', error.message);
                }
            }
        };
        getProfile();
    }, [getUserByToken]);

    return (
        <main>
            <div className="profile-container">
                <h2>User Profile</h2>

                {user ? (
                    <>
                        <div className="profile-info-row">
                            <span className="profile-info-label">Username</span>
                            <span className="profile-info-value">{user.username}</span>
                        </div>

                        <div className="profile-info-row">
                            <span className="profile-info-label">Email</span>
                            <span className="profile-info-value">{user.email}</span>
                        </div>


                        <button
                            className="btn-delete mt-8 w-full"
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-center text-slate-400">Loading profile data...</p>
                )}
            </div>
        </main>
    );
}; //gu

export default Profile;
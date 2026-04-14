import { Link, Outlet } from 'react-router';

const Layouts = () => {
    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <nav className="p-4 bg-zinc-800 shadow-md">
                <ul className="flex gap-4">
                    <li><Link className="hover:text-blue-400" to="/">Home</Link></li>
                    <li><Link className="hover:text-blue-400" to="/profile">Profile</Link></li>
                    <li><Link className="hover:text-blue-400" to="/upload">Upload</Link></li>
                </ul>
            </nav>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layouts;
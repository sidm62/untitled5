import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { UserProvider } from './contexts/UserContexts.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Layouts from './components/Layouts';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';

const App = () => {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <UserProvider>
                <Routes>
                    <Route element={<Layouts />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/single" element={<Single />} />


                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </UserProvider>
        </Router>
    );
};

export default App;
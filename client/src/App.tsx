import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Message from './components/Message';
import Profile from './components/Profile';
import Register from './components/Register';
import { useAuthContext } from './contexts/AuthContext';

function App() {
    const [loading, setLoading] = useState(true);
    const { checkAuth } = useAuthContext();

    useEffect(() => {
        const authenticate = async () => {
            await checkAuth();
            setLoading(false);
        };
        authenticate();
    }, []);
    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="logout" element={<Profile />} />
                        <Route path="message" element={<Message />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

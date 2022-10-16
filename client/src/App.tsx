import { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
 import ChatRoom from './components/ChatRoom';
// import Home from './components/Home';
// import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
// import Message from './components/Message';
// import Profile from './components/Profile';
// import Register from './components/Register';
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
                        <Route path="/" element={<Login />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/chat-room/*" element={<ChatRoom /> } /> 
                        <Route path="/register" element={<Register/> } /> 
                    
                
                        
                </Routes>
            </BrowserRouter>
           
             
        </div>
        
    );
}

export default App;

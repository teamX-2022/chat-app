// import { Route } from 'react-router-dom';
import MessageContextProvider from '../contexts/MessageContext';
import Chat from './pages/chatroom/Chat';
import MemberList from './pages/memberlist/MemberList';
function Message() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MessageContextProvider>
                <MemberList />
                <Chat />
            </MessageContextProvider>
        </div>
    );
}

export default Message;

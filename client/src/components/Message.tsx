import { useState } from 'react';
import Chat from './pages/chatroom/Chat';
import MemberList from './pages/memberlist/MemberList';

function Message() {
    const [id, setId] = useState('');
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MemberList setId={setId} />
            <Chat id={id} />
        </div>
    );
}

export default Message;

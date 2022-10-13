import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateMessageMutation } from '../../../../generated/graphql';
import './chataction.css';

// import { useEffect } from 'react';
// import { client } from '../../../..';
interface ChatActionProps {
    msgId: string;
}

const ChatAction: FC<ChatActionProps> = ({ msgId }) => {
    const { id } = useParams();

    const [text, setText] = useState('');
    const [sendMessage, _] = useCreateMessageMutation();
    const onClick = async () => {
        await sendMessage({
            variables: {
                createMessageCreateMessageInput2: {
                    conversationId: id as string,
                    messageText: text,
                },
            },
        });
    };
    return (
        <div className="actionContainer" key={msgId}>
            <div>
                <input
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    value={text}
                    type="text"
                    className="textInput"
                />
            </div>
            <div>
                <button onClick={onClick} className="sendBtn">
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatAction;

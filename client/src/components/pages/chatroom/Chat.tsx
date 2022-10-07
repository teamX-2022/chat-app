// import { Dispatch, SetStateAction } from 'react';
import { useGetMessagesQuery } from '../../../generated/graphql';
import './chat.css';

interface OptionalMiddleName {
    id: string;
}

const Chat = ({ id }: OptionalMiddleName) => {
    const { loading, error, data } = useGetMessagesQuery({
        fetchPolicy: 'no-cache',
        variables: {
            getMessagesConversationId2: id,
        },
    });
    if (loading) return <h1>loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="chatContainer">
            <div className="messageContainer">
                <div className="messageList">
                    <div className="messageCard">
                        <p className="messageText">Lorem ipsum dolor,{id}</p>
                    </div>
                    {data?.getMessages.map((e) => (
                        <div className="messageCard">
                            <p className="messageText">{e.messageText}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatAction">
                <div className="actionContainer">
                    <div>
                        <input type="text" className="textInput" />
                    </div>
                    <div>
                        <button className="sendBtn">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

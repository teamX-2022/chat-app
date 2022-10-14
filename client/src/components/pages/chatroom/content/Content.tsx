import './content.css';
import { Message, MessageSentDocument, useGetMessagesQuery } from '../../../../generated/graphql';
import { useParams } from 'react-router-dom';
import JWTManager from '../../../../utils/jwt';
import { useEffect } from 'react';
// import { gql, useSubscription } from '@apollo/client';
// import { useEffect } from 'react';

interface Property {
    msgId: string;
}

const Content = ({ msgId }: Property) => {
    let { id } = useParams();
    const userId = JWTManager.getUserId();

    if (userId === null) {
        throw new Error('login');
    }

    const { loading, error, data, subscribeToMore } = useGetMessagesQuery({
        fetchPolicy: 'network-only',
        variables: {
            getMessagesConversationId2: id as string,
        },
    });

    useEffect(() => {
        subscribeToMore({
            document: MessageSentDocument,
            variables: {
                topic: id as string,
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessage = (subscriptionData.data as any).messageSent;
                console.log(newMessage);

                return Object.assign({}, prev, {
                    getMessages: [...prev.getMessages, newMessage],
                });
            },
        });
    }, []);

    if (loading)
        return (
            <div className="chatContainer">
                <div className="messageContainer"></div>
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
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="messageList">
            <div className="messageCard">
                <p className="messageText">Lorem ipsum dolor,{msgId}</p>
            </div>
            {data?.getMessages.map((e: Message) => (
                <div key={e._id} className={e.senderId === userId ? 'messageCard mymessage' : 'messageCard'}>
                    <p className="messageText">{e.messageText}</p>
                </div>
            ))}
        </div>
    );
};

export default Content;

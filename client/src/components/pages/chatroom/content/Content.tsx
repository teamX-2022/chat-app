import './content.css';
import { Message, useGetMessagesQuery } from '../../../../generated/graphql';
import { useParams } from 'react-router-dom';

interface Property {
    msgId: string;
}

const Content = ({ msgId }: Property) => {
    let { id } = useParams();

    const { loading, error, data } = useGetMessagesQuery({
        fetchPolicy: 'no-cache',
        variables: {
            getMessagesConversationId2: id as string,
        },
    });

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
                <div key={e._id} className="messageCard">
                    <p className="messageText">{e.messageText}</p>
                </div>
            ))}
        </div>
    );
};

export default Content;

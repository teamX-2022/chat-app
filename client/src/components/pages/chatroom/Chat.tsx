// import { Dispatch, SetStateAction } from 'react';
import './chat.css';

interface OptionalMiddleName {
    id: string;
}

const Chat = ({ id }: OptionalMiddleName) => {
    return (
        <div className="chatContainer">
            <div className="messageContainer">
                <div className="messageList">
                    <div className="messageCard">
                        <p className="messageText">Lorem ipsum dolor,{id}</p>
                    </div>
                    <div className="messageCard mymessage">
                        <p className="messageText">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus architecto officiis
                            aliquid reiciendis earum. Assumenda totam in vitae unde ducimus accusantium excepturi
                            dolorum voluptatem, blanditiis sunt? Eligendi facilis recusandae tenetur.
                        </p>
                    </div>
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

// import { Dispatch, SetStateAction } from 'react';
import { useMessageContext } from '../../../contexts/MessageContext';
import './chat.css';
import { Route, Routes } from 'react-router-dom';
import Content from './content/Content';

const Chat = () => {
    const { id } = useMessageContext();

    return (
        <Routes>
            <Route
                path="/"
                element={
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
                }
            ></Route>
            <Route
                path="/:id"
                element={
                    <div className="chatContainer">
                        <div className="messageContainer">
                            <Content msgId={id} />
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
                }
            />
        </Routes>
    );
};

export default Chat;

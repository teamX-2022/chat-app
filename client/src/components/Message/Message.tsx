
import { Avatar, Button, Popover } from 'antd';

import {
  DoubleRightOutlined, RetweetOutlined, EllipsisOutlined
} from "@ant-design/icons";
import '../Message/index.css'
import { useParams } from 'react-router-dom';
import { Message, useGetMessagesQuery, useGetUserQuery } from '../../generated/graphql';
import JWTManager from '../../utils/jwt';
import { FC } from 'react';
import Moment from 'react-moment';

interface Property {
  msgId: string;
}

interface UserProps {
  senderId: string
}




const Messagee = ({ msgId }: Property) => {
  let { id } = useParams();
  const userId = JWTManager.getUserId();

  if (userId === null) {
    throw new Error('login');
  }
  const { loading, error, data } = useGetMessagesQuery({
    fetchPolicy: 'no-cache',
    variables: {
      getMessagesConversationId2: id as string,
    },
  });

  const GetName: FC<UserProps> = ({ senderId }) => {

    const { loading, data: dataUser } = useGetUserQuery({
      variables: {
        userId: senderId
      }
    })
    if (loading) return (<h5 style={{ textAlign: 'left' }} ></h5>)
    return (<h5 style={{ textAlign: 'left' }} >{dataUser?.getUser.name}</h5>)
  }

  const GetAvatarUserSender: FC<UserProps> = ({ senderId }) => {

    const { loading, data: dataUser } = useGetUserQuery({
      variables: {
        userId: senderId
      }
    })
    if (loading) return (<h5 style={{ textAlign: 'left' }} ></h5>)
    if (dataUser?.getUser.avatar) {

      return <Avatar size={35} src={dataUser?.getUser.avatar}></Avatar>
    }
    return (<Avatar size={35}>{dataUser?.getUser.name.slice(0, 1)}</Avatar>)
  }


  const rePlay = (
    <div>
      <p>Đánh dấu tin nhắn</p>
      <p>Lưu về máy</p>
      <p>Thu hồi</p>
      <p>Xóa chỉ ở phía tôi</p>
    </div>
  );
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
    <div>
      {data?.getMessages.map((e: Message) => (
        <div key={e._id} className={e.senderId === userId ? 'message__bao own' : 'message__bao'}>
          <div className={e.senderId === userId ? 'avatar-chat-mine' : 'avatar-chat-friend'} >
            {/* <Avatar size={35} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} /> */}
            <GetAvatarUserSender senderId={e.senderId} />
          </div>
          <div className={e.senderId === userId ? 'chat-bao chat-bao-mine' : 'chat-bao chat-bao-friend'}>
            <div className={e.senderId === userId ? 'chat-mine' : 'chat-friend'} style={{ margin: '15px', paddingLeft: '15px', paddingTop: '10px', paddingRight: '10px' }}>
              <p hidden className="messageText">Lorem ipsum dolor,{msgId}</p>
              {/* <p style={{textAlign:'left'}}> {getUserSender(e.senderId)}</p> */}
              <GetName senderId={e.senderId} />
              {/* chattttt */}
              <p className='info-chat' style={{ textAlign: 'left' }}>
                {e.messageText}
              </p>
              {/* .....end chat */}

              <p className={e.senderId === userId ? 'time-chat-my' : 'time-chat-friend'} style={{ fontSize: '10px' }}>
                <Moment format="hh:mm" >
                  {e.createdAt}
                </Moment>
                &nbsp; ngày &nbsp; 
                <Moment format="DD-MM-yyyy" >
                  {e.createdAt}
                </Moment>
                <br />

              </p>

            </div>

            <div className={e.senderId === userId ? 'rep-chat rep-chat-mine' : 'rep-chat rep-chat-friend'}>

              <Popover placement="right" content={rePlay} trigger="click">
                <Button className='btn-tran' icon={<EllipsisOutlined />} />
              </Popover>

              <Button className='btn-tran' icon={<DoubleRightOutlined />} />
              <Button className='btn-tran' icon={<RetweetOutlined />} />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};
export default Messagee;
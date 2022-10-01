
import { Avatar, Button, Popover } from 'antd';

import {
  DoubleRightOutlined, RetweetOutlined,EllipsisOutlined
} from "@ant-design/icons";
import '../Message/index.css'




export default function Message({own}:{own:any}) {
  
  const rePlay = (
    <div>
      <p>Đánh dấu tin nhắn</p>
      <p>Lưu về máy</p>
      <p>Thu hồi</p>
      <p>Xóa chỉ ở phía tôi</p>
    </div>
  );

  return (

    <div className={own ? 'message__bao own' : 'message__bao'}>
      <div className={own ? 'avatar-chat-mine' : 'avatar-chat-friend'} >
        <Avatar size={35} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
      </div>
      <div className={own ? 'chat-bao chat-bao-mine' : 'chat-bao chat-bao-friend'}>
        <div className={own ? 'chat-mine'  : 'chat-friend'} style={{ margin: '15px', paddingLeft: '15px', paddingTop: '10px', paddingRight: '10px' }}>
          
            <h5 style={{textAlign:'left'}} >name user</h5>
            <p className='info-chat' style={{textAlign:'left'}}>chatchatchatchatchacaxxxxxxzbbbbaaaaahsssssssssssatchaatchattchatchatchatctchatchatchatchachatctchatchatchachatctchatchatchachatc

            </p>
            <p className={own ? 'time-chat-my' : 'time-chat-friend'} style={{ fontSize: '10px'}}>time</p>
          

        </div>

        <div className={own ? 'rep-chat rep-chat-mine' : 'rep-chat rep-chat-friend'}>

        <Popover placement="right" content={rePlay} trigger="click">
        <Button className='btn-tran' icon={<EllipsisOutlined />} />
        </Popover>
          
          <Button className='btn-tran' icon={<DoubleRightOutlined />} />
          <Button className='btn-tran' icon={<RetweetOutlined />} />
        </div>
      </div>

    </div>

  );
}
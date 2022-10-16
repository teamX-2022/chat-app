

import { Row, Col, Button, Input, Modal } from 'antd'

import './ChatList.css';
import {
   SearchOutlined,UserAddOutlined,UsergroupAddOutlined
} from "@ant-design/icons";
import { useState } from 'react';
import SuggestionsSearch from './SuggestionsSearch';



export default function TopChatList() {
    const [openAddFriend, setOpenAddFriend] = useState(false);
    const showModalAddFriend = () => {
    setOpenAddFriend(true);
  };

  const handleOkModalAddFriend = () => {
    setOpenAddFriend(false);
  };

  const handleCancelModalAddFriend = () => {
    setOpenAddFriend(false);
  };
    return (
        
        <div className='chatlist__top'>
            
            <div className='chatlist__top-bao'>
            {/* <Avatar src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"}/> */}

            <Row>
                {/* <Col className='menu' span={4}><MenuOutlined style={{fontSize:'150%'}} /></Col> */}
                <Col span={24}>
                    <Input style={{width:'70%'}} prefix={<SearchOutlined />} placeholder="search chat" />
                    <Button onClick={showModalAddFriend} className='btn-tran' icon={<UserAddOutlined />}/>
                    <Modal cancelText='Hủy' okText={'Tìm'} width={350} style={{width:'100px'}} title="Thêm bạn" open={openAddFriend} onOk={handleOkModalAddFriend} onCancel={handleCancelModalAddFriend}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Avatar size={80}>aa</Avatar> */}
                        <Input placeholder='tên'/>
                        </div>
                        <h4 style={{paddingTop:'15px'}}>Danh sách</h4>
                        <div>
                            <SuggestionsSearch/>
                        </div>
                    </Modal>
                    <Button className='btn-tran' icon={<UsergroupAddOutlined />}/>
                </Col>
                <Col span={24} style={{display:'flex',alignItems:'center',paddingTop:'15px',paddingLeft:'20px'}}>
                        <h4 style={{marginRight:'15px'}}>Tất cả</h4>
                        <h4>Chưa đọc</h4>
                </Col>
            </Row>

            
            </div>
        </div>

    );
}
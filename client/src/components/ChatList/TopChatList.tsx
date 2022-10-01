

import { Row, Col, Button, Input } from 'antd'

import './ChatList.css';
import {
   SearchOutlined,UserAddOutlined,UsergroupAddOutlined
} from "@ant-design/icons";



export default function TopChatList() {
    return (

        <div className='chatlist__top'>
            <div className='chatlist__top-bao'>
            {/* <Avatar src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"}/> */}

            <Row>
                {/* <Col className='menu' span={4}><MenuOutlined style={{fontSize:'150%'}} /></Col> */}
                <Col span={24}>
                    <Input style={{width:'70%'}} prefix={<SearchOutlined />} placeholder="search chat" />
                    <Button className='btn-tran' icon={<UserAddOutlined />}/>
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
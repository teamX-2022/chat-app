
import { Row, Col, Avatar, Button, Modal, Input,Checkbox } from 'antd';

import {
  UserOutlined, UsergroupAddOutlined, SplitCellsOutlined, EditOutlined,VideoCameraOutlined, SearchOutlined
} from "@ant-design/icons";
import '../ChatWindow/index.css'
import { useState } from 'react';

export default function ChatWindowTop() {
  const [isModalReNameOpen, setIsModalReNameOpen] = useState(false);
  const [isModalAddMember,setIsModalAddMember] = useState(false);

  const CheckboxGroup = Checkbox.Group;
  const listFriend = [
    'aaa','bbb','ccc'
  ];
  const defaultCheckedList = [''];

//rename modal
  const showModalReName = () => {
    setIsModalReNameOpen(true);
  };

  const handleOkModalReName = () => {
    setIsModalReNameOpen(false);
  };

  const handleCancelModalReName = () => {
    setIsModalReNameOpen(false);
  };
// add member
const showModalAddMember = () => {
  setIsModalAddMember(true);
};

const handleOkModalAddMember = () => {
  setIsModalAddMember(false);
};

const handleCancelModalAddMember = () => {
  setIsModalAddMember(false);
};
// checkbox add member
const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const onChange = (list:any) => {
    setCheckedList(list);
  };

//end checkbox

  return (

    <div className='chat-window-top__bao'>
      <div style={{ padding: '15px 15px 15px 0px' }}>
        <Row style={{display:'flex'}} align='middle'>
          <Col style={{display:'flex',alignItems:'center',justifyContent:'center'}}  span={2}>
            <div>
              <Avatar.Group maxCount={2} size='small'>
                <Avatar size={25} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
                <Avatar size={25} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
                <Avatar size={25} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
                <Avatar size={25} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
              </Avatar.Group>
            </div>


          </Col>
          <Col span={12}>
            <div className='name-chat__bao' style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '0px', marginRight: '5px' }}>Name chat</h3>
              <div style={{ position: 'relative' }}>
                <Button onClick={showModalReName} className='btn-edit-name-chat' style={{borderWidth:'0px'}} size='small' icon={<EditOutlined />} />
                
                <Modal title="Đổi tên" open={isModalReNameOpen} onOk={handleOkModalReName} onCancel={handleCancelModalReName}>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <Avatar size={80}>aa</Avatar>
                  </div>
                  
                  <p>Bạn có chắc muốn thay đổi tên cuộc trò chuyện, khi xác nhận tên mới sẽ được cập nhật</p>
                  <Input/>
                </Modal>
              </div>

            </div>

            <div style={{display:'flex', alignItems:'center'}}>
              <UserOutlined />
              <a>member</a>
            </div>
          </Col>
          <Col span={10}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ paddingRight: '10px' }}>
                <Button onClick={showModalAddMember} className='btn-tran' icon={<UsergroupAddOutlined />} />
                <Modal title="Thêm thành viên" open={isModalAddMember} onOk={handleOkModalAddMember} onCancel={handleCancelModalAddMember}>
                <Input prefix={<SearchOutlined />} placeholder="Nhập tên, số điện thoại, email" />
                <div >
                  <h4>Trò chuyện gần đây</h4>
                  <div>
               
      
                  <CheckboxGroup style={{display:'flex',flexDirection:'column'}} options={listFriend} value={checkedList} onChange={onChange} />
                  </div>
                </div>
                

                  
                 
                </Modal>
              </div>
              <div style={{ paddingRight: '10px' }}>
                <Button className='btn-tran' icon={<VideoCameraOutlined />} />

              </div>
              <div style={{ paddingRight: '10px' }}>
                <Button className='btn-tran btn-infochat' icon={<SplitCellsOutlined />} />

              </div>

            </div>

          </Col>
        </Row>
      </div>


    </div>

  );
}

 //import React from 'react';
import { Button, Avatar,Dropdown,Menu,Popover, Modal } from 'antd'
import {
  AuditOutlined, MessageOutlined, SettingOutlined
} from "@ant-design/icons";
import { useAuthContext } from '../../contexts/AuthContext';
import { useGetUserQuery, useLogoutMutation } from '../../generated/graphql';
import { useNavigate } from "react-router-dom";
import JWTManager from "../../utils/jwt";
import { useState } from 'react';

export default function SlideMenuLeft() {
  const navigate = useNavigate();
  const {logoutClient } = useAuthContext();
  const [logoutServer, _] = useLogoutMutation();
  const logout = async () => {
    logoutClient();
    await logoutServer({
      variables: {
        userId: JWTManager.getUserId()?.toString() as string,
      },
    });
    
    
    window.location.href = "/login"
    navigate("/login")

  };
  const [openInfoUser, setOpenInfoUser] = useState(false);
  const showModalInfoUser = () => {
    setOpenInfoUser(true);
  };

  const handleOkModalInfoUser = () => {
    setOpenInfoUser(false);
  };

  const handleCancelModalInfoUser = () => {
    setOpenInfoUser(false);
  };

  const {data} = useGetUserQuery({
    variables:{
      userId : JWTManager.getUserId()?.toString() as string,
    }
  })

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <h3>
              {data?.getUser.name}
            </h3>
          ),
        },
        {
          key: '2',
          label: (
            <span onClick={showModalInfoUser}>
              Hồ sơ của bạn
            </span>
            
          
          ),
        },
        {
          key: '3',
          label: (
            <a  href="">
              Cài đặt
            </a>
          ),
        },
        {
          key: '4',
          label: (
               <span onClick={logout}>logout</span>
          ),
        },
      ]}
    />
  );
      const optionsSetting =(
        <div>
          <p style={{marginBottom:'5px',cursor:'pointer'}} onClick={showModalInfoUser}>Thông tin cá nhân</p>
          <p style={{marginBottom:'5px',cursor:'pointer'}}>Cài đặt</p>
          <p style={{marginBottom:'5px',cursor:'pointer'}} onClick={logout}>Đăng xuất</p>
        </div>
      );
      


  return (
    


    <div style={{ height: '100vh', backgroundColor: '#1E90FF' }}>
      <Modal width={350} style={{width:'100px'}} title="Thông tin cá nhân" open={openInfoUser} onOk={handleOkModalInfoUser} onCancel={handleCancelModalInfoUser}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar size={80} src={data?.getUser.avatar ?data?.getUser.avatar : "" }>
                {data?.getUser.avatar ?"": data?.getUser.name.slice(0,1)}
              </Avatar>
              
            </div>
            <h3 style={{textAlign:'center', paddingTop:'10px'}}>{data?.getUser.name}</h3>
            <h3>Thông tin</h3>
            <div style={{display:'flex'}}>
              <p style={{marginRight:'30px'}}>Điện thoại</p>
              <p>00000000</p>
            </div>
            
            <div style={{display:'flex'}}>
              <p style={{marginRight:'30px'}}>Giới tính</p>
              <p>Nam</p>
            </div>
            <div style={{display:'flex'}}>
              <p style={{marginRight:'30px'}}>Ngày sinh</p>
              <p>15/11/2001</p>
            </div>
            
      </Modal>
      {/* <Row  >
          <Col className='menu' span={24}><Avatar size={40} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} /></Col>
          <Col type="flex" align="middle" span={24}>
            <MessageOutlined style={{ fontSize: '175%' }} />
          </Col>
          <Col type="flex" align="middle" span={24}>
            <AuditOutlined style={{ fontSize: '175%' }} />
          </Col>
        </Row> */}
      <div className='SlideMenu__bao'>
        
        <div style={{ margin: '15px' }}>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            arrow={{
              pointAtCenter: true,
            }}
          >
             <Avatar className='avatar-sidemenu' size={40} src={data?.getUser.avatar ? data?.getUser.avatar: "aaa"}>
             {data?.getUser.avatar? "":data?.getUser.name.slice(0,1) }
             </Avatar>
          </Dropdown>
         

        </div>


        <div style={{ padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <Button className='btn-tran' icon={<MessageOutlined style={{ fontSize: '175%' }} />} />
        </div>
        <div style={{ padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }} >
          <Button className='btn-tran' icon={<AuditOutlined style={{ fontSize: '175%' }} />} />
        
        </div>
        
       

        <div style={{padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          
          <Popover placement="right" content={optionsSetting} trigger="click">
             <Button className='btn-tran' icon={<SettingOutlined style={{ fontSize: '175%' }} />} />
          </Popover>
        </div>






      </div>





    </div>


  );
}
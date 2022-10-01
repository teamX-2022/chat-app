
 //import React from 'react';
import { Button, Avatar,Dropdown,Menu } from 'antd'
import {
  AuditOutlined, MessageOutlined, SettingOutlined
} from "@ant-design/icons";
import { useAuthContext } from '../../contexts/AuthContext';
import { useLogoutMutation } from '../../generated/graphql';
import { useNavigate } from "react-router-dom";
import JWTManager from "../../utils/jwt";

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
    navigate("..")
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <h3>
              Name
            </h3>
          ),
        },
        {
          key: '2',
          label: (
            <a href="">
              Hồ sơ của bạn
            </a>
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
           
              
               <button onClick={logout}>logout</button>
             
           
          ),
        },
      ]}
    />
  );

  return (
    

    <div style={{ height: '100vh', backgroundColor: '#1E90FF' }}>

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
             <Avatar className='avatar-sidemenu' size={40} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"} />
          </Dropdown>
         

        </div>


        <div style={{ padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <Button className='btn-tran' icon={<MessageOutlined style={{ fontSize: '175%' }} />} />
        </div>
        <div style={{ padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }} >
          <Button className='btn-tran' icon={<AuditOutlined style={{ fontSize: '175%' }} />} />
        </div>


        <div style={{ padding: '15px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
          <Button className='btn-tran' icon={<SettingOutlined style={{ fontSize: '175%' }} />} />
        </div>






      </div>





    </div>


  );
}
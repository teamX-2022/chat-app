

import {Row, Col, Avatar} from 'antd'
import {Button,Popover} from 'antd'
import {
    EllipsisOutlined
 } from "@ant-design/icons";



export default function CenterChatList() {
    const otherSettingItem = (
        <div>
            <p>Ghim</p>
            <p>Ẩn trò chuyện</p>
            <p>Tắt thông báo</p>
            <p>Xóa hội thoại</p>
           
        </div>
    )
  return (
    <div className='ItemUser__bao'>
        <div className='ItemUser'>
            <Row style={{display:'flex',alignItems:'center', height:'80px'}}>
                <Col style={{display:'flex',alignItems:'center',justifyContent:'center'}} span={6}>
                    <Avatar size={60} src={"https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"}/>
                </Col>
                <Col style={{paddingLeft:'10px'}} span={15}>
                  
                   <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                        <div style={{display:'flex' , justifyContent:'space-between',alignItems:'center'}}>
                            <h4 style={{textAlign:'left'}}>Name User connect</h4>
                            {/* <div>
                                <p style={{marginRight:'10px'}}>time</p>
                               
                            </div> */}
                            
                        </div>
                        <div>
                            <p style={{textAlign:'left',margin:'0px'}}>tin nhan gan nhat</p>
                        </div>
                        
                    </div>
                    
                </Col>
                <Col span={3}>
                    <div> 
                        <p className='last-time-chat' style={{marginRight:'10px',margin:'0px'}}>time</p>
                        
                        <Popover placement="bottomLeft" content={otherSettingItem} trigger="click">
                            <Button className='btn-tran item-chat-options' icon={<EllipsisOutlined />}/>
                        </Popover>
                        
                    </div>
                </Col>
            </Row>
        </div>
    </div>
        
      
  );
}
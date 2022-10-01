
import { Row,Col,Button, Input } from 'antd';

import {
    SmileOutlined,PictureOutlined,LinkOutlined,SendOutlined
  } from "@ant-design/icons";

const {TextArea} = Input;

export default function ChatWindowBot() {
  return (
   
    <Row style={{height:'100%',paddingLeft:'10px'}}>
      <Col style={{paddingTop:'10px'}} span={24}>
          <div style={{display:'flex'}}>
                <Button style={{marginRight:'15px'}} icon={<SmileOutlined />}/>
                <Button style={{marginRight:'15px'}} icon={<PictureOutlined />}/>
                <Button icon={<LinkOutlined />}/>
          </div>
      </Col>
      <Col style={{display:'flex',paddingTop:'10px'}} span={24}>

            <div style={{width:'95%'}}>
                <TextArea style={{height:'100%'}} rows={2}/>
            </div>
            <div>
                <Button style={{height:'100%'}} icon={<SendOutlined />}/>
            </div>

      </Col>
    </Row>
    
  );
}
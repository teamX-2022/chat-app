

import {Row, Col} from 'antd'
import TopChatList from './TopChatList';
import CenterChatList from './CenterChatList';



export default function ChatList() {
  return (
      
          <Row >
        <Col style={{border:'2px solid #F5F5F5'}} span={24}>
            <TopChatList/>
        </Col>
        <Col className='chatlist__bao' style={{border:'2px solid #F5F5F5', maxHeight:'87vh', overflow:'auto'}} span={24}>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>
            <CenterChatList/>

        </Col>

      </Row>
     
      
    
  );
}
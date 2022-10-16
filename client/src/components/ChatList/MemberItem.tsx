

import {Row, Col, Avatar} from 'antd'
import {Button,Popover} from 'antd'
import {
    EllipsisOutlined
 } from "@ant-design/icons";
import { useGetMyFriendByConversationIdQuery, useGetUserQuery } from '../../generated/graphql';
import { FC } from 'react';
// import Moment from 'react-moment';
// import moment from 'moment';

interface Prop {
    converId: string;
}

const MemberItem: FC<Prop> = ({ converId })=> {
    
    const { loading, error, data } = useGetMyFriendByConversationIdQuery({
        variables: {
            conversationId: converId,
        },
    });
    const {data:userInGroup} = useGetUserQuery({
        variables:{
            userId : data?.getMyFriendByConversationId.userId as string
        }
    })
    // const setCreatedAt = moment().add(data?.getMyFriendByConversationId.createdAt);
    if (loading) return <h1>loading...</h1>;
    if (error) return <h4>not found</h4>;
    const otherSettingItem = (
        <div>
            <p>Ghim</p>
            <p>Ẩn trò chuyện</p>
            <p>Tắt thông báo</p>
            <p>Xóa hội thoại</p>
           
        </div>
    )
    
  return (
    <div className={'ItemUser__bao'}>
        <div className='ItemUser'>
            <Row style={{display:'flex',alignItems:'center', height:'80px'}}>
                <Col style={{display:'flex',alignItems:'center',justifyContent:'center'}} span={6}>
                    <Avatar size={60} src={userInGroup?.getUser.avatar ? userInGroup?.getUser.avatar : ""}>
                        {userInGroup?.getUser.avatar ? "": userInGroup?.getUser.name.slice(0,1)}
                    </Avatar>
                </Col>
                <Col style={{paddingLeft:'10px'}} span={15}>
                  
                   <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                        <div style={{display:'flex' , justifyContent:'space-between',alignItems:'center'}}>
                            <h4 style={{textAlign:'left'}}>{data?.getMyFriendByConversationId.name}</h4>
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
                    
                        <p className='last-time-chat' style={{marginRight:'10px',margin:'0px'}}>
                            time
                        </p>
                        
                        <Popover placement="bottomLeft" content={otherSettingItem} trigger="click">
                            <Button className='btn-tran item-chat-options' icon={<EllipsisOutlined />}/>
                        </Popover>
                        
                    </div>
                </Col>
            </Row>
        </div>
    </div>
        
      
  );
};
export default MemberItem;
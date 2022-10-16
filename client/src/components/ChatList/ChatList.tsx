
// import avatar from '../../images/img.png';
import {Row, Col} from 'antd'
import TopChatList from './TopChatList';
import MemberItem from './MemberItem';
import { useGetListConversationQuery } from '../../generated/graphql';
import { useMessageContext } from '../../contexts/MessageContext';

import { Link } from 'react-router-dom';



export default function ChatList() {
  const { loading, error, data } = useGetListConversationQuery({ fetchPolicy: 'no-cache' });
    const { setId } = useMessageContext();
    if (loading) return <h1>loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    const onClick = (id: string) => {
        setId(id);
    };
  return (
      
          <Row >
        <Col style={{border:'2px solid #F5F5F5'}} span={24}>
            <TopChatList/>
        </Col>
        <Col className='chatlist__bao' style={{border:'2px solid #F5F5F5', maxHeight:'87vh', overflow:'auto'}} span={24}>
          
            {data?.getListConversation.map((item) => (

                

                    <Link key={item._id} to={item._id as string}>
                        <div className="member" key={item._id} onClick={() => onClick(item._id as string)}>
                        
                            {/* <div className="memberAvatar">
                                <img src={avatar} alt="" className="memberImg" />
                            </div>

                            <div className="memberInfo">
                                <MemberName converId={item._id as string} />
                                <LastMessage className="lastMessage" />
                            </div> */}
                            <MemberItem converId={item._id as string}/>
                        </div>

                    
                            
        
                        
                    </Link>
                    
                    
                ))}
                
            

        </Col>

      </Row>
     
      
    
  );
}
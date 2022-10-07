import './memberlist.css';
import avatar from '../../../images/img.png';
import { useGetListConversationQuery } from '../../../generated/graphql';
import MemberName from '../../memberName/MemberName';
import LastMessage from '../../lastMessage/LastMessage';
import { useMessageContext } from '../../../contexts/MessageContext';

const MemberList = () => {
    const { loading, error, data } = useGetListConversationQuery({ fetchPolicy: 'no-cache' });
    const { setId } = useMessageContext();
    if (loading) return <h1>loading...</h1>;
    if (error) return <h1>{JSON.stringify(error)}</h1>;

    const onClick = (id: string) => {
        setId(id);
    };
    return (
        <div className="memberListContainer">
            <div>
                <h3 className="memberListTile">Chat</h3>
            </div>
            <div className="memberList">
                <div className="member">
                    <div className="memberAvatar">
                        <img src={avatar} alt="" className="memberImg" />
                    </div>

                    <div className="memberInfo">
                        <h4 className="memberName">Hieu</h4>
                        <p className="lastMessage">day la tin nhan cuoi cung</p>
                    </div>
                </div>
                {data?.getListConversation.map((item) => (
                    <div className="member" key={item._id} onClick={() => onClick(item._id as string)}>
                        <div className="memberAvatar">
                            <img src={avatar} alt="" className="memberImg" />
                        </div>

                        <div className="memberInfo">
                            <MemberName converId={item._id as string} />
                            <LastMessage className="lastMessage" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberList;

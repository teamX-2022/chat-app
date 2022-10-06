import { FC } from 'react';
import { useGetMyFriendByConversationIdQuery } from '../../generated/graphql';

interface Prop {
    converId: string;
}

const MemberName: FC<Prop> = ({ converId }) => {
    const { loading, error, data } = useGetMyFriendByConversationIdQuery({
        variables: {
            conversationId: converId,
        },
    });

    if (loading) return <h1>loading...</h1>;
    if (error) return <h4>not found</h4>;

    return (
        <>
            <h4>{data?.getMyFriendByConversationId.name}</h4>
        </>
    );
};

export default MemberName;

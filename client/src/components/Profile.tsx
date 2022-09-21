import { useHelloQuery } from '../generated/graphql';

function Profile() {
    const { data, error, loading } = useHelloQuery({ fetchPolicy: 'no-cache' });
    if (loading) return <h1>loading...</h1>;
    if (error) return <h4>Error: {JSON.stringify(error)}</h4>;
    return <h3>{data?.hello}</h3>;
}

export default Profile;

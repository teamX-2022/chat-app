import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';
import JWTManager from '../utils/jwt';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line
    const [login, _] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await login({
            variables: {
                loginInput: {
                    username,
                    password,
                    email: '',
                },
            },
        });

        if (response.data?.login.success) {
            JWTManager.setToken(response.data.login.accessToken as string);
            navigate('..');
        } else {
            if (response.data?.login.message) setError(response.data?.login.message);
        }
    };

    return (
        <>
            {error && <h1>{error}</h1>}
            <form style={{ marginTop: '5px' }} onSubmit={onSubmit}>
                <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} />
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;

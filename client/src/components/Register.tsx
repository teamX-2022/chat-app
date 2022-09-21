import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [register, _] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await register({
            variables: {
                registerInput: {
                    username,
                    password,
                    email,
                },
            },
        });
        navigate('..');
    };

    return (
        <form style={{ marginTop: '5px' }} onSubmit={onSubmit}>
            <input placeholder="username" onChange={(e) => setUsername(e.target.value)} type="text" value={username} />
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
            <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;

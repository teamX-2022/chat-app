import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <h1>JWT AUTHENTICATED FULL STACK</h1>
            <nav style={{ borderBottom: '1px solid', paddingBottom: '1rem' }}>
                <Link to="login">Login</Link> |<Link to="register">Register</Link> |<Link to="logout">Logout</Link> |{' '}
                <Link to="profile">Logout</Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;

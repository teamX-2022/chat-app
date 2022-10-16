import { Col, Input, Row } from "antd";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginMutation } from "../generated/graphql";
import JWTManager from "../utils/jwt";
//import ChatRoom from "./ChatRoom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticatied } = useAuthContext();

  // eslint-disable-next-line
  const [login, _] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await login({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
    });

    if (response.data?.login.success) {
      JWTManager.setToken(response.data.login.accessToken as string);
      navigate("/chat-room");
      setIsAuthenticatied(true);
    } else {
      if (response.data?.login.message) setError(response.data?.login.message);
    }

  };

  return (
    <div className="bao_login" style={{height:'100vh',position:'absolute',width:"100%",backgroundImage:`url("https://giaiphapzalo.com/wp-content/uploads/2021/09/pagebg-1-1920x705.jpg")`}}>
      {error && <h1>{error}</h1>}
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <Row style={{ width: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
          <Col span={10}>
              <img style={{width:'100%',height:'100%'}} src="https://image.shutterstock.com/shutterstock/photos/228370189/display_1500/stock-vector-social-media-background-people-connecting-through-modern-technology-devices-228370189.jpg" alt="" />
          </Col>
          <Col span={14} style={{padding:'20px',backgroundColor:'white'}}>
            <h1 style={{color:'#1E90FF'}}>Đăng nhập</h1>
            <form style={{ marginTop: "5px" }} onSubmit={onSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '15px' }}>
                <label style={{ textAlign: 'left', fontWeight: 'bolder' }}>Tài khoản</label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                  placeholder="Nhập tên tài khoản"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '50px' }}>
                <label style={{ textAlign: 'left', fontWeight: 'bolder' }}>Mật khẩu</label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div style={{ paddingBottom: '15px' }}>
                <button style={{ width: '100%', height: '40px', cursor: 'pointer', backgroundColor: '#1E90FF', color: "white", border: 'none' }} type="submit">Đăng nhập</button>

              </div>
              <div>
                <a href="">Quên mật khẩu</a>
                <br />
                <a href="/register">Đăng ký</a>
              </div>

            </form>
          </Col>

        </Row>

      </div>
    </div>

  );
};

export default Login;

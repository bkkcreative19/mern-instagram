import React, { useState, useContext } from "react";
import "./Login.scss";
import Logo from "../../images/logo.png";
import * as ROUTES from "../../constants/routes";
import Iphone from "../../images/iphone-with-profile.jpg";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/context";

const Login = () => {
  const history = useHistory();
  const { login } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };

    try {
      await login(obj, history);
    } catch (err) {
      // setErrors(err);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__img">
          <img src={Iphone} alt="iphone" />
        </div>
        <div className="login__right">
          <div className="login__right-container">
            <img
              src={Logo}
              alt="logo"
              className="login__right-container-logo"
            />
            <form
              onSubmit={handleLogin}
              className="login__right-container-form"
            >
              {errors}
              <input
                type="text"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Email Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>Login</button>
            </form>
          </div>
          <div className="login__right-dont">
            <p>Don't have an account?</p>
            <Link to={ROUTES.SIGN_UP}>
              <span>Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "./SignUp.scss";
import Logo from "../../images/logo.png";
import * as ROUTES from "../../constants/routes";
import Iphone from "../../images/iphone-with-profile.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="sign-up__container">
        <div className="sign-up__img">
          <img src={Iphone} alt="iphone" />
        </div>
        <div className="sign-up__right">
          <div className="sign-up__right-container">
            <img
              src={Logo}
              alt="logo"
              className="sign-up__right-container-logo"
            />
            <form className="sign-up__right-container-form">
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Full name" />
              <input type="text" placeholder="Email Address" />
              <input type="password" placeholder="Email Password" />
              <button>Sign-up</button>
            </form>
          </div>
          <div className="sign-up__right-dont">
            <p>Have an account?</p>
            <Link to={ROUTES.LOGIN}>
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

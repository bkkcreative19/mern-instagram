import React, { useContext } from "react";
import "./Header.scss";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../images/logo.png";
import * as ROUTES from "../../constants/routes";
import { Context } from "../../context/context";

const Header = () => {
  const { logout, user } = useContext(Context);
  const history = useHistory();
  const handleSignOut = () => {
    logout();
    history.push("/login");
  };

  return (
    <header className="header">
      <nav className="header__nav container">
        <div className="header__nav-logo">
          <Link to={ROUTES.DASHBOARD} aria-label="instagram-logo">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__nav-list">
          <Link to={ROUTES.DASHBOARD} aria-label="instagram-logo">
            <i className="fas fa-home"></i>
          </Link>

          <a href="#" type="button" title="Sign Out">
            <i onClick={handleSignOut} className="fas fa-sign-out-alt"></i>
          </a>

          <Link to={`/p/${user.name}`}>
            <span>{user.name}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

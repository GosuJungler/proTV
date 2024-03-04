import React from 'react';
import classes from "./Header.module.css";
import logo from '../../../assets/Logo.png'

const Header = () => {
  return (
    <div className={classes.container}>
      <img
        src={logo}
        alt=""
      />
    </div>
  );
};

export default Header;

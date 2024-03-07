import React from 'react';
import classes from "./Header.module.css";
import logo from '../../../assets/Logo.png'

const Header = () => {
  return (
    <div className={classes.container}>
      <a
        href="https://stirileprotv.ro/"
        target={'_blank'}
      >
        <img
          src={logo}
          alt=""
        />
      </a>
    </div>
  );
};

export default Header;

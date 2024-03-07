import React from 'react';
import classes from "./Footer.module.css";
import smoploIcon from '../../../assets/smoplo-icon.png'

const Footer = () => {
  return (
    <div className={classes.container}>
      <a href="https://somplo.com" target={'_blank'}>
        <img
          src={smoploIcon}
          alt=""
          className={classes.smoploIcon}
        />
      </a>
    </div>
  );
};

export default Footer;

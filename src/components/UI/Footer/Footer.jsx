import React from 'react';
import classes from "./Footer.module.css";
import smoploIcon from '../../../assets/smoplo-icon.png'

const Footer = () => {
  return (
    <div className={classes.container}>
      <img
        src={smoploIcon}
        alt=""
        className={classes.smoploIcon}
      />
    </div>
  );
};

export default Footer;

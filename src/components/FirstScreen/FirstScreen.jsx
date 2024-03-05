import React, {useEffect, useState} from 'react';
import ViewSwitcher from "../UI/ViewSwitcher/ViewSwitcher";
import firstScreenImage from '../../assets/first-screen-image.png'
import firstScreenImageMobile from '../../assets/first-screen-mobile.png'
import classes from "./FirstScreen.module.css";
import {useMyContext} from "../../Context";

const FirstScreen = () => {
  const {isDesktop} = useMyContext()

  return (
    <div>
      <ViewSwitcher/>
      <div className={classes.container}>
        <div className={classes.mainContent}>
          <div className={classes.title}>
            Avansat Publicitate
          </div>
          <div className={classes.title}>
            Produse de la
          </div>
          <div className={classes.title2}>
            Stirile <strong>pro・tv</strong>
          </div>
          <div className={classes.description}>
            Instrumente de publicitate tehnologică pentru videoclipuri și bogate, cu un efect unic pentru îmbunătățirea
            vizibilității și a brandingului În aplicația Kerkida.
          </div>
          <button className={classes.mainButton}>
            VEZI MAI MULT
          </button>
        </div>
        <div className={classes.mainImage}>
          <img
            width={'100%'}
            src={isDesktop ? firstScreenImage : firstScreenImageMobile}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;

import React from 'react';
import classes from './ViewSwitcher.module.css'
import {useMyContext} from "../../../Context";

const ViewSwitcher = () => {

  const {selectedADS, updateSelectedADS} = useMyContext()

  const handleScrollClick = (value, isDesk = true) => {
    updateSelectedADS(value)
    const selector = isDesk ? '#desktopScreen' : '#mobileScreen'
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <div className={classes.container}>
      <div
        className={classes.viewItem}
        style={{color: !selectedADS ? '#FFFFFF' : ''}}
        onClick={() => handleScrollClick(0)}
      >DESKTOP ADS
      </div>
      <div
        className={classes.viewItem}
        style={{color: selectedADS ? '#FFFFFF' : ''}}
        onClick={() => handleScrollClick(1, false)}
      >MOBILE ADS
      </div>
    </div>
  );
};

export default ViewSwitcher;

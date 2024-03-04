import React from 'react';
import classes from './ViewSwitcher.module.css'
import {useMyContext} from "../../../Context";

const ViewSwitcher = () => {

  const {selectedADS, updateSelectedADS} = useMyContext()

  return (
    <div className={classes.container}>
      <div
        className={classes.viewItem}
        style={{color: !selectedADS ? '#FFFFFF' : ''}}
        onClick={() => updateSelectedADS(0)}
      >DESKTOP ADS
      </div>
      <div
        className={classes.viewItem}
        style={{color: selectedADS ? '#FFFFFF' : ''}}
        onClick={() => updateSelectedADS(1)}
      >MOBILE ADS
      </div>
    </div>
  );
};

export default ViewSwitcher;

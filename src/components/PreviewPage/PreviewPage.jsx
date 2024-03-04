import React from 'react';
import classes from "./PreviewPage.module.css";
import desktopImage from '../../assets/desktop.png'
import refresh from '../../assets/refresh.png'
import openLink from '../../assets/open-link.png'
import {useMyContext} from "../../Context";
import {DEMOS} from "../../consts";

const PreviewPage = ({variant}) => {

  const {
    selectedDemo,
    selectedPricing,
    selectedSizeDesktop,
    selectedSizeMobile,
    updateSelectedSizeDesktop,
    updateSelectedSizeMobile,
    updateSelectedPricing,
    updateSelectedDemo
  } = useMyContext()

  const handleSelectedSizeChange = (value) => {
    if (!variant) {
      updateSelectedSizeDesktop(value)
    } else {
      updateSelectedSizeMobile(value)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {!variant ? 'DESKTOP ADS' : 'MOBILE ADS'}
      </div>
      <div className={classes.content + ' ' + (variant ? classes.contentReverse : '')}>
        <div className={classes.demosBlock}>
          <div
            className={classes.templateTypeButtons}
            style={{flexDirection: !variant ? 'row' : 'row-reverse'}}
          >
            <button
              className={classes.templateTypeButton + ' ' + (!selectedPricing ? classes.selectedTemplateTypeButton : '')}
              onClick={() => updateSelectedPricing(0)}
            >RICHBOX
            </button>
            <button
              className={classes.templateTypeButton + ' ' + (selectedPricing ? classes.selectedTemplateTypeButton : '')}
              onClick={() => updateSelectedPricing(1)}
            >VIDEOBOX
            </button>
          </div>
          <div className={classes.demosList}>
            {DEMOS.map(demo => (<div
              onClick={() => updateSelectedDemo(demo)}
              key={demo.id}
              className={classes.demoItem + ' ' + (selectedDemo.id === demo.id ? classes.selectedDemoItem : '')}
            >{demo.name}</div>))}
          </div>
        </div>
        <div className={classes.previewBlock}>
          <div className={classes.sizeButtons}>
            <div
              className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 0 || variant && selectedSizeMobile === 0 ? classes.selectedSizeButton : '')}
              onClick={() => handleSelectedSizeChange(0)}
            >300x600
            </div>
            {!variant && <div
              className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 1 ? classes.selectedSizeButton : '')}
              onClick={() => handleSelectedSizeChange(1)}
            >970x250</div>}
            <div
              className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 2 || variant && selectedSizeMobile === 2 ? classes.selectedSizeButton : '')}
              onClick={() => handleSelectedSizeChange(2)}
            >300x250
            </div>
          </div>
          <div className={classes.desktopBlock}>
            <img
              className={classes.desktopImage}
              src={desktopImage}
              alt=""
            />
          </div>
          <div className={classes.iframeButtons}>
            <div className={classes.iframeButton}>
              <img
                src={refresh}
                alt=""
                className={classes.iframeButtonImage}
              />
              Refresh
            </div>
            <div className={classes.iframeButton}>
              <img
                src={openLink}
                alt=""
                className={classes.iframeButtonImage}
              />
              New Window
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;

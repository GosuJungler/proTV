import React from 'react';
import classes from "./PreviewPage.module.css";
import desktopImage from '../../assets/desktop.png'
import refresh from '../../assets/refresh.png'
import openLink from '../../assets/open-link.png'
import {useMyContext} from "../../Context";

const PreviewPage = ({variant}) => {

  const {selectedPricing, selectedSize, updateSelectedSize, updateSelectedPricing} = useMyContext()

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {!variant ? 'DESKTOP ADS' : 'MOBILE ADS'}
      </div>
      <div className={classes.content}>
        <div className={classes.demosBlock}>
          <div
            className={classes.templateTypeButtons}
            style={{flexDirection: !variant ? 'row' : 'row-reverse'}}
          >
            <button
              className={classes.templateTypeButton}
              onClick={() => updateSelectedPricing(0)}
              style={{
                color: !selectedPricing ? '#051B66' : '',
                borderBottom: !selectedPricing ? '2px solid #051B66' : ''
              }}
            >RICHBOX
            </button>
            <button
              className={classes.templateTypeButton}
              onClick={() => updateSelectedPricing(1)}
              style={{
                color: selectedPricing ? '#051B66' : '',
                borderBottom: selectedPricing ? '2px solid #051B66' : ''
              }}
            >VIDEOBOX
            </button>
          </div>
          <div className={classes.demosList}>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
            <div className={classes.demoItem}>RichBox - 50:50</div>
            <div className={classes.demoItem}>RichBox - Animated Products Ingredient</div>
          </div>
        </div>
        <div className={classes.previewBlock}>
          <div className={classes.sizeButtons}>
            <div
              className={classes.sizeButton}
              style={{
                background: selectedSize === 0 ? 'rgba(41, 80, 234, 1)' : '',
                color: selectedSize === 0 ? 'rgba(255, 255, 255, 1)' : ''
              }}
              onClick={() => updateSelectedSize(0)}
            >300x600
            </div>
            {!variant && <div
              className={classes.sizeButton}
              style={{
                background: selectedSize === 1 ? 'rgba(41, 80,' +
                  ' 234, 1)' : '', color: selectedSize === 1 ? 'rgba(255, 255, 255, 1)' : ''
              }}
              onClick={() => updateSelectedSize(1)}
            >970x250</div>}
            <div
              className={classes.sizeButton}
              style={{
                background: selectedSize === 2 ? 'rgba(41, 80, 234, 1)' : '', color: selectedSize === 2 ?
                  'rgba(255, 255, 255, 1)' : ''
              }}
              onClick={() => updateSelectedSize(2)}
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

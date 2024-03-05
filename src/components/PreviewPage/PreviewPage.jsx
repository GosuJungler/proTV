import React, {useEffect, useRef, useState} from 'react';
import classes from "./PreviewPage.module.css";
import desktopImage from '../../assets/desktop.png'
import mobileImage from '../../assets/mobile.png'
import refresh from '../../assets/refresh.png'
import openLink from '../../assets/open-link.png'
import {useMyContext} from "../../Context";
import {DEMOS} from "../../consts";

const PreviewPage = ({variant}) => {

  const [demosDesktop, setDemosDesktop] = useState(DEMOS.filter(demo => !demo.type))
  const [demosMobile, setDemosMobile] = useState(DEMOS.filter(demo => !demo.type))
  const [desktopDemoLink, setDesktopDemoLink] = useState()
  const [mobileDemoLink, setMobileDemoLink] = useState()
  const desktopIframeRef = useRef(null);
  const mobileIframeRef = useRef(null);

  const {
    selectedDemo,
    selectedPricingDesktop,
    selectedSizeDesktop,
    selectedSizeMobile,
    selectedPricingMobile,
    setSelectedPricingMobile,
    updateSelectedSizeDesktop,
    updateSelectedSizeMobile,
    updateSelectedPricingDesktop,
    updateSelectedDemo
  } = useMyContext()

  const handleSelectedSizeChange = (value) => {
    if (!variant) {
      updateSelectedSizeDesktop(value)
    } else {
      updateSelectedSizeMobile(value)
    }
  }

  const handleReloadClick = () => {
    if (!variant) {
      desktopIframeRef?.current?.contentWindow?.location?.reload();
    } else {
      mobileIframeRef?.current?.contentWindow?.location?.reload();
    }
  };

  const handleNewWindowClick = () => {
    const currentId = !variant ? desktopDemoLink : mobileDemoLink
    window.open('https://demo.somplo.com/demo/' + getDemoId(currentId, '='), '_blank');
  }

  const getDemoId = (link, separator = '/') => {
    const urlParts = link.split(separator);
    return urlParts[urlParts.length - 1]
  }

  const handleSelectedPricingClick = (value) => {
    if (!variant) {
      updateSelectedPricingDesktop(value)
    } else {
      setSelectedPricingMobile(value)
    }
  }

  useEffect(() => {
    if (!variant) {
      console.log(variant)
      switch (selectedDemo) {
        case 0:
          setDesktopDemoLink('300x600.html?demoid=' + getDemoId(selectedDemo.link300x600))
          break
        case 1:
          setDesktopDemoLink('970x250.html?demoid=' + getDemoId(selectedDemo.link970x250))
          break
      }
    } else {
      switch (selectedSizeMobile) {
        case 0:
          setMobileDemoLink('300x600-mobile.html?demoid=' + getDemoId(selectedDemo.link300x600))
          break
        case 2:
          setMobileDemoLink('300x250.html?demoid=' + getDemoId(selectedDemo.link300x250))
          break
      }
    }
  }, [selectedSizeDesktop, selectedSizeMobile, selectedDemo]);

  useEffect(() => {
    if (selectedPricingDesktop) {
      setDemosDesktop(DEMOS.filter(demo => demo.type))
    } else {
      setDemosDesktop(DEMOS.filter(demo => !demo.type))
    }
  }, [selectedPricingDesktop]);

  useEffect(() => {
    if (selectedPricingMobile) {
      setDemosMobile(DEMOS.filter(demo => demo.type))
    } else {
      setDemosMobile(DEMOS.filter(demo => !demo.type))
    }
  }, [selectedPricingMobile]);

  useEffect(() => {
    if (!demosDesktop.find(el => el.id === selectedDemo.id) && !variant) {
      updateSelectedDemo(demosDesktop[0])
    }
  }, [demosDesktop])

  useEffect(() => {
    if (!demosMobile.find(el => el.id === selectedDemo.id) && variant) {
      updateSelectedDemo(demosMobile[0])
    }
  }, [demosMobile])

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
              className={classes.templateTypeButton + ' ' + (!selectedPricingDesktop && !variant || !selectedPricingMobile && variant ?
                classes.selectedTemplateTypeButton : '')}
              onClick={() => handleSelectedPricingClick(0)}
            >RICHBOX
            </button>
            <button
              className={classes.templateTypeButton + ' ' + (selectedPricingDesktop && !variant || selectedPricingMobile && variant ? classes.selectedTemplateTypeButton : '')}
              onClick={() => handleSelectedPricingClick(1)}
            >VIDEOBOX
            </button>
          </div>
          <div className={classes.demosList}>
            {!variant && demosDesktop.map(demo => (<div
              onClick={() => updateSelectedDemo(demo)}
              key={demo.id}
              className={classes.demoItem + ' ' + (selectedDemo.id === demo.id ? classes.selectedDemoItem : '')}
            >{demo.name}</div>))
            }
            {variant && demosMobile.map(demo => (<div
              onClick={() => updateSelectedDemo(demo)}
              key={demo.id}
              className={classes.demoItem + ' ' + (selectedDemo.id === demo.id ? classes.selectedDemoItem : '')}
            >{demo.name}</div>))
            }
          </div>
        </div>
        <div className={`${classes.previewBlock} ${variant ? classes.previewBlockMobile : ''}`}>
          <div
            className={classes.sizeButtons}
            style={{padding: !variant ? '25px' : 0}}
          >
            <div
              style={{marginRight: variant ? '25px' : 0}}
              className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 0 || variant && selectedSizeMobile === 0 ? classes.selectedSizeButton : '')}
              onClick={() => handleSelectedSizeChange(0)}
            >300x600
            </div>
            {!variant && <div
              className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 1 ? classes.selectedSizeButton : '')}
              onClick={() => handleSelectedSizeChange(1)}
            >970x250</div>}
            {!!variant &&
              <div
                className={classes.sizeButton + ' ' + (variant && selectedSizeMobile === 2 ? classes.selectedSizeButton : '')}
                onClick={() => handleSelectedSizeChange(2)}
              >300x250</div>
            }
          </div>
          <div className={`${classes.previewWrapper} ${variant ? classes.previewWrapperMobile : ''}`}>
            <div className={!variant ? classes.desktopBlock : classes.mobileBlock}>
              <img
                className={classes.desktopImage}
                src={!variant ? desktopImage : mobileImage}
                alt=""
              />
              {!variant ?
                <iframe
                  ref={desktopIframeRef}
                  className={classes.desktopIframe}
                  src={desktopDemoLink}
                  frameBorder="0"
                ></iframe>
                :
                <iframe
                  ref={mobileIframeRef}
                  className={classes.mobileIframe}
                  src={mobileDemoLink}
                  frameBorder="0"
                ></iframe>
              }
            </div>
            <div className={`${classes.iframeButtons} ${variant ? classes.iframeButtonsMobile : ''}`}>
              <div
                className={classes.iframeButton}
                onClick={handleReloadClick}
              >
                <img
                  src={refresh}
                  alt=""
                  className={classes.iframeButtonImage}
                />
                Refresh
              </div>
              <div
                className={classes.iframeButton}
                onClick={handleNewWindowClick}
              >
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
    </div>
  );
};

export default PreviewPage;

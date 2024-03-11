import React, {useEffect, useRef, useState} from 'react';
import classes from "./PreviewPage.module.css";
import desktopImage from '../../assets/desktop.png'
import mobileImage from '../../assets/mobile.png'
import refresh from '../../assets/refresh.png'
import openLink from '../../assets/open-link.png'
import {useMyContext} from "../../Context";
import {DEMOS} from "../../consts";
import linkImageWhite from '../../assets/link-image-white.png'

const PreviewPage = ({variant}) => {

  const isMobile = window.innerWidth < 1200
  const [demosDesktop, setDemosDesktop] = useState(DEMOS.filter(demo => !demo.type && demo.id !== 66))
  const [demosMobile, setDemosMobile] = useState(DEMOS.filter(demo => !demo.type))
  const [desktopDemoLink, setDesktopDemoLink] = useState()
  const [mobileDemoLink, setMobileDemoLink] = useState()
  const desktopIframeRef = useRef(null);
  const mobileIframeRef = useRef(null);

  const {
    isDesktop,
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
      switch (value) {
        case 0:
          setDemosDesktop(DEMOS.filter(demo => demo.type === selectedPricingDesktop && demo.id !== 66))
          break
        case 1:
          setDemosDesktop(DEMOS.filter(demo => demo.type === selectedPricingDesktop && demo.id !== 66 && demo.id !== 65 && demo.id !== 51))
          break
      }
      updateSelectedSizeDesktop(value)
    } else {
      switch (value) {
        case 0:
          setDemosMobile(DEMOS.filter(demo => demo.type === selectedPricingMobile))
          break
        case 2:
          setDemosMobile(DEMOS.filter(demo => demo.type === selectedPricingMobile && demo.id !== 66))
          break
      }
      updateSelectedSizeMobile(value)
    }
  }

  const handleReloadClick = () => {
    if (!variant) {
      if (desktopIframeRef.current?.src) {
        desktopIframeRef.current.src = '' + desktopIframeRef?.current.src
      }
    } else {
      if (mobileIframeRef.current?.src) {
        mobileIframeRef.current.src = '' + mobileIframeRef?.current.src
      }
    }
  };

  const handleNewWindowClick = () => {
    const currentId = !variant ? desktopDemoLink : mobileDemoLink
    const id = selectedDemo.link300x600.split('/')[selectedDemo.link300x600.split('/').length - 1]
    if (id === '219623495')  {
      !isMobile && window.open('interscroller-preview.html?demoid=' + id, '_blank');
      isMobile && window.open('interscroller-preview-mobile.html?demoid=' + id, '_blank');
    } else {
      window.open('https://demo.somplo.com/demo/' + getDemoId(currentId, '='), '_blank');
    }
  }

  const handleDemoOpen = (demoType) => {
    switch (demoType) {
      case 0:
        if (!selectedDemo.link300x600) return
        const id = selectedDemo.link300x600.split('/')[selectedDemo.link300x600.split('/').length - 1]
        if (id === '219623495')  {
          !isMobile && window.open('interscroller-preview.html?demoid=' + id, '_blank');
          isMobile && window.open('interscroller-preview-mobile.html?demoid=' + id, '_blank');
        } else {
          window.open(selectedDemo.link300x600, '_blank');
        }
        break
      case 1:
        if (!selectedDemo.link300x250) return;
        window.open(selectedDemo.link300x250, '_blank');
        break
      case 2:
        if (!selectedDemo.link970x250) return;
        window.open(selectedDemo.link970x250, '_blank');
        break
    }
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
      switch (selectedSizeDesktop) {
        case 0:
          if (!selectedDemo.link300x600) return
          setDesktopDemoLink('300x600.html?demoid=' + getDemoId(selectedDemo.link300x600))
          break
        case 1:
          if (!selectedDemo.link970x250) return
          setDesktopDemoLink('970x250.html?demoid=' + getDemoId(selectedDemo.link970x250))
          break
      }
    } else {
      switch (selectedSizeMobile) {
        case 0:
          if (!selectedDemo.link300x600) return
          setMobileDemoLink('300x600-mobile.html?demoid=' + getDemoId(selectedDemo.link300x600))
          break
        case 2:
          if (!selectedDemo.link300x250) return
          setMobileDemoLink('300x250.html?demoid=' + getDemoId(selectedDemo.link300x250))
          break
      }
    }
  }, [selectedSizeDesktop, selectedSizeMobile, selectedDemo]);

  useEffect(() => {
    if (selectedPricingDesktop) {
      setDemosDesktop(DEMOS.filter(demo => demo.type && (variant !== null ? demo.id !== 66 : true)))
    } else {
      setDemosDesktop(DEMOS.filter(demo => !demo.type && (variant !== null ? demo.id !== 66 : true)))
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
    <div
      className={classes.container}
      id={`${!variant ? 'desktopScreen' : 'mobileScreen'}`}
    >
      <div className={classes.title}>
        {!variant && isDesktop ? 'DESKTOP ADS' : variant && isDesktop ? 'MOBILE ADS' : 'MOBILE & DESKTOP ADS'}
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
            {!!!variant && demosDesktop.map(demo => (<div
              onClick={() => updateSelectedDemo(demo)}
              key={demo.id}
              className={classes.demoItem + ' ' + (selectedDemo.id === demo.id ? classes.selectedDemoItem : '')}
            >{demo.name}</div>))
            }
            {!!variant && demosMobile.map(demo => (<div
              onClick={() => updateSelectedDemo(demo)}
              key={demo.id}
              className={classes.demoItem + ' ' + (selectedDemo.id === demo.id ? classes.selectedDemoItem : '')}
            >{demo.name}</div>))
            }
          </div>
        </div>
        {isDesktop &&
          <div className={`${classes.previewBlock} ${variant ? classes.previewBlockMobile : ''}`}>
            <div
              className={classes.sizeButtons}
              style={{padding: !variant ? '25px' : '0'}}
            >
              <div
                className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 0 || variant && selectedSizeMobile === 0 ? classes.selectedSizeButton : '')}
                onClick={() => handleSelectedSizeChange(0)}
                style={{marginRight: variant ? '25px' : '0', opacity: selectedDemo.link300x600 ? 1 : 0.65, pointerEvents: selectedDemo.link300x600 ? 'auto' : 'none'}}
              >300x600
              </div>
              {!variant && <div
                className={classes.sizeButton + ' ' + (!variant && selectedSizeDesktop === 1 ? classes.selectedSizeButton : '')}
                onClick={() => handleSelectedSizeChange(1)}
                style={{opacity: selectedDemo.link970x250 ? 1 : 0.65, pointerEvents: selectedDemo.link970x250 ? 'auto' : 'none'}}
              >970x250</div>}
              {!!variant &&
                <div
                  className={classes.sizeButton + ' ' + (variant && selectedSizeMobile === 2 ? classes.selectedSizeButton : '')}
                  onClick={() => handleSelectedSizeChange(2)}
                  style={{opacity: selectedDemo.link300x250 ? 1 : 0.65, pointerEvents: selectedDemo.link300x250 ? 'auto' : 'none'}}
                >300x250</div>
              }
            </div>
            <div className={`${classes.previewWrapper} ${variant ? classes.previewWrapperMobile : ''}`}>
              <div className={!variant ? classes.desktopBlock : classes.mobileBlock}>
                <img
                  className={!variant ? classes.desktopImage : classes.mobileImageBl}
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
                  id={'refresh-button'}
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
        }
      </div>
      {!isDesktop &&
        <>
          <div className={classes.linksContainer}>
            <button onClick={() => handleDemoOpen(0)} className={classes.linkItem}><span>300x600</span><span className={classes.linkButton}>New Window <img
              width={'22.5px'}
              style={{marginLeft: 15, opacity: selectedDemo.link300x600 ? 1 : 0.65}}
              src={linkImageWhite}
              alt=""
            /></span></button>
            <button onClick={() => handleDemoOpen(1)} className={classes.linkItem} style={{ opacity: selectedDemo.link300x250 ? 1 : 0.65}}><span>300x250</span><span className={classes.linkButton}>New Window <img
              width={'22.5px'}
              style={{marginLeft: 15}}
              src={linkImageWhite}
              alt=""
            /></span></button>
            <button onClick={() => handleDemoOpen(2)} className={`${classes.linkItem}  ${classes.link970}`}><span>970x250</span><span className={classes.linkButton}>New Window <img
              width={'22.5px'}
              style={{marginLeft: 15}}
              src={linkImageWhite}
              alt=""
            /></span></button>
          </div>
        </>
      }
    </div>
  );
};

export default PreviewPage;

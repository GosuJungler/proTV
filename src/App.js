import './App.css';
import Header from "./components/UI/Header/Header";
import FirstScreen from "./components/FirstScreen/FirstScreen";
import MyContext from "./Context";
import {useEffect, useState} from "react";
import PreviewPage from "./components/PreviewPage/PreviewPage";
import Footer from "./components/UI/Footer/Footer";

function App() {
  const [selectedADS, setSelectedADS] = useState(0)
  const [selectedPricingDesktop, setSelectedPricingDesktop] = useState(0)
  const [selectedPricingMobile, setSelectedPricingMobile] = useState(0)
  const [selectedSizeDesktop, setSelectedSizeDesktop] = useState(0)
  const [selectedSizeMobile, setSelectedSizeMobile] = useState(0)
  const [selectedDemo, setSelectedDemo] = useState({
    id: 0,
    type: 0,
    name: 'Display Banner',
    link300x600: 'https://demo.somplo.com/demo/335949563',
    link300x250: 'https://demo.somplo.com/demo/480651940',
    link970x250: 'https://demo.somplo.com/demo/760729125',
  })
  const [isDesktop, setIsDesktop] = useState(true)

  const updateSelectedADS = (value) => {
    setSelectedADS(value)
  }
  const updateSelectedDemo = (value) => {
    setSelectedDemo(value)
  }
  const updateSelectedPricingDesktop = (value) => {
    setSelectedPricingDesktop(value)
  }
  const updateSelectedPricingMobile = (value) => {
    setSelectedPricingDesktop(value)
  }
  const updateSelectedSizeDesktop = (value) => {
    setSelectedSizeDesktop(value)
  }
  const updateSelectedSizeMobile = (value) => {
    setSelectedSizeMobile(value)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsDesktop(false)
      } else {
        setIsDesktop(true)
      }
    };
    handleResize()

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MyContext.Provider value={{
      selectedADS, selectedDemo, selectedPricingDesktop, selectedSizeDesktop, selectedSizeMobile, setSelectedSizeMobile, selectedPricingMobile, setSelectedPricingMobile, isDesktop, updateSelectedADS, updateSelectedDemo, updateSelectedPricingDesktop, updateSelectedPricingMobile, updateSelectedSizeDesktop, updateSelectedSizeMobile
    }}>
      <div className="App">
        <Header/>
        <FirstScreen/>
        {isDesktop &&
          <>
            <PreviewPage variant={0}/>
            <PreviewPage variant={1}/>
          </>
        }
        {
          !isDesktop &&
          <PreviewPage variant={null}/>
        }
        <Footer/>
      </div>
    </MyContext.Provider>
  );
}

export default App;

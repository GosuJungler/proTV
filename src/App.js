import './App.css';
import Header from "./components/UI/Header/Header";
import FirstScreen from "./components/FirstScreen/FirstScreen";
import MyContext from "./Context";
import {useEffect, useState} from "react";
import PreviewPage from "./components/PreviewPage/PreviewPage";

function App() {
  const [selectedADS, setSelectedADS] = useState(0)
  const [selectedPricing, setSelectedPricing] = useState(0)
  const [selectedSizeDesktop, setSelectedSizeDesktop] = useState(0)
  const [selectedSizeMobile, setSelectedSizeMobile] = useState(0)
  const [selectedDemo, setSelectedDemo] = useState({name: 'RichBox - 50:50', id: 0})

  const updateSelectedADS = (value) => {
    setSelectedADS(value)
  }
  const updateSelectedDemo = (value) => {
    setSelectedDemo(value)
  }
  const updateSelectedPricing = (value) => {
    setSelectedPricing(value)
  }
  const updateSelectedSizeDesktop = (value) => {
    setSelectedSizeDesktop(value)
  }
  const updateSelectedSizeMobile = (value) => {
    console.log(value)
    setSelectedSizeMobile(value)
  }

  return (
    <MyContext.Provider value={{
      selectedADS, selectedDemo, selectedPricing, selectedSizeDesktop, selectedSizeMobile, setSelectedSizeMobile, updateSelectedADS, updateSelectedDemo, updateSelectedPricing, updateSelectedSizeDesktop, updateSelectedSizeMobile
    }}>
      <div className="App">
        <Header/>
        <FirstScreen/>
        <PreviewPage variant={0}/>
        <PreviewPage variant={1}/>
      </div>
    </MyContext.Provider>
  );
}

export default App;

import './App.css';
import TemplateDemo from './Nav_bar_compenent/nav';
import Search from './Search_compenent/search';
import Result from './Section_compenent/section';
import Date_c from './date_compenent/date';
import Qibla from './Qibla_Compenet/qibla';
import All_adkar from './adkar_compenent/all_adkar';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Router>
        {showLoader && <h1 className='loader'></h1>}
        <TemplateDemo />
        <Date_c />
        <Routes>
          <Route path="/" element={<Result />} />
          <Route path="/Qibla" element={<Qibla />} />
          <Route path="/Adkar" element={<All_adkar />} />
          {/* <Route path="/search" element={<Search onSearch={handleSearch} />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
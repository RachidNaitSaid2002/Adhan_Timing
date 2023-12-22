import './App.css';
import TemplateDemo from './Nav_bar_compenent/nav';
import Search from './Search_compenent/search';
import Result from './Section_compenent/section';
import Date_c from './date_compenent/date';
import { useState,useEffect } from 'react';

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
      {showLoader && <h1 className='loader'></h1>}
      <TemplateDemo/>
      <Date_c/>
      <Search onSearch={handleSearch} />
      <Result City={searchValue}/>
    </>
  );
}

export default App;

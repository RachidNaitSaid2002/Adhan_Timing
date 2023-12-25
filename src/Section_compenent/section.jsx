import React, { useState, useEffect } from 'react';
import './section.scss';
import R_Adkar from '../dikr_compenent/adkar_random';

const Result = ({ City }) => {
  const [content, setContent] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  const [maka, setMaka] = useState([]);
  const [rabat, setRabat] = useState([]);
  const [sydney, setSydney] = useState([]);
  const [jerusalem, setJerusalem] = useState([]);
  const [new_y, setNew] = useState([]);

  const currentDate = new Date();

  const [position, setPosition] = useState(null);
  const [city, setCity] = useState(null);

  
  const [nextPrayer, setNextPrayer] = useState('');
  const [nextTimer, setNextTimer] = useState('');


  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition(position.coords);
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        if (position) {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.latitude}&lon=${position.longitude}&limit=1&appid=b51382f765bfb74791bd7ca6e2edbdd8`
          );
          const data = await response.json();
          console.log('data:', data);
          if (data && data[0]) {
            setCity(data[0].name);
          }
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      }
    };
    fetchCity();
  }, [position]);

  useEffect(() => {
    const fetchData = async (address, setState) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByAddress/${currentDate.toISOString()}?address=${address}`
        );
        const data = await response.json();
        setState(data.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchData('rabat', setRabat);
    fetchData('sydney', setSydney);
    fetchData('jerusalem', setJerusalem);
    fetchData('New York', setNew);
    fetchData('maka', setMaka);
    fetchData(city, setContent);
  }, [city]);


  // Inside the Result component

  useEffect(() => {
   const calculateTimeRemaining = () => {
    const prayerTimes = content?.timings || {};

    const filteredPrayerTimes = Object.keys(prayerTimes).reduce((filtered, prayer) => {
      if (
        prayer === "Fajr" ||
        prayer === "Dhuhr" ||
        prayer === "Asr" ||
        prayer === "Maghrib" ||
        prayer === "Isha"
      ) {
        filtered[prayer] = prayerTimes[prayer];
      }
      return filtered;
    }, {});

  const now = new Date();

  let nextPrayer = null;
  for (const prayer in filteredPrayerTimes) {
    const prayerTime = new Date(`${currentDate.toDateString()} ${filteredPrayerTimes[prayer]}`);
    if (prayerTime > now) {
      nextPrayer = { name: prayer, time: prayerTime };
      break;
    }
  }

  if (nextPrayer && content) {
    const timeRemaining = nextPrayer.time - now;
    setNextPrayer(nextPrayer.name);
    console.log("NextPrayer:", nextPrayer, "NextTimer:", nextTimer); // Add this line
    const updatedTimeRemaining = timeRemaining - 1000;
    const updatedHours = Math.floor(updatedTimeRemaining / (1000 * 60 * 60));
    const updatedMinutes = Math.floor((updatedTimeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const updatedSeconds = Math.floor((updatedTimeRemaining % (1000 * 60)) / 1000);
    setNextTimer(`${updatedHours} : ${updatedMinutes} : ${updatedSeconds}`);
  }
};

    calculateTimeRemaining();

    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);
  
    return () => clearInterval(timer);
  }, [content, currentDate]);


 console.log(nextPrayer,nextTimer)

 if(nextPrayer == ''){
  setNextPrayer('Fajr')
 }

  return (
    <div className="result">
      <div className="left_content">
        {content === 'Unable to geocode address.' ? (
          <div className="not">
            <h1>Not Found</h1>
          </div>
        ) : (
          <>
            <div className='head_T'>
              <span className='tout'>
                <span className="material-symbols-outlined">
                  table
                </span>
                Today Adhan Timing In {city}
              </span>
            </div>
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Fajr</th>
                  <th>Dhuhr</th>
                  <th>Asr</th>
                  <th>Maghrib</th>
                  <th>Isha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{content.timings?.Fajr}</td>
                  <td>{content.timings?.Dhuhr}</td>
                  <td>{content.timings?.Asr}</td>
                  <td>{content.timings?.Maghrib}</td>
                  <td>{content.timings?.Isha}</td>
                </tr>
              </tbody>
            </table>
            <div className="next">
              <p className='tit'> Next Adhan </p>
              {nextPrayer && <p>{nextPrayer}</p>}
              {nextTimer && <p>{nextTimer}</p>}
            </div>
            <div className='sun'>
              <div className='Sunsite'>
                <img src="https://images.pexels.com/photos/10705956/pexels-photo-10705956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sunset" />
                <div className='infiS'>
                  <div className='con'>
                    <span className='first'>Sunset</span>
                    <span className='second'>{content.timings?.Sunset}</span>
                  </div>
                </div>
              </div>
              <div className='Sunsite'>
                <img src="https://images.pexels.com/photos/19455409/pexels-photo-19455409/free-photo-of-soleil-couchant-silhouette-soir-reflet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sunrise" />
                <div className='infiS'>
                  <div className='con'>
                    <span className='first'>Sunrise</span>
                    <span className='second'>{content.timings?.Sunrise}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      <R_Adkar/>
      </div>
      <div className="right_content">
        <div className="head_r">
          <span class="material-symbols-outlined">public</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="desc">World Timing Adhan</span>
        </div>
        <div className="citys">
          <img src="https://images.pexels.com/photos/19085093/pexels-photo-19085093/free-photo-of-ville-monument-building-mur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rabat" />
          <div className="cont_r">
            <h4>Rabat</h4>
            <div className="tab">
              <div className="t_head">
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <div className="t_body">
                <span>{rabat.timings?.Fajr}</span>
                <span>{rabat.timings?.Dhuhr}</span>
                <span>{rabat.timings?.Asr}</span>
                <span>{rabat.timings?.Maghrib}</span>
                <span>{rabat.timings?.Isha}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="citys">
          <img src="https://i.pinimg.com/564x/19/b9/f8/19b9f8f493d6b99585a197371e5fef88.jpg" alt="Maka" />
          <div className="cont_r">
            <h4>Makaa</h4>
            <div className="tab">
              <div className="t_head">
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <div className="t_body">
                <span>{maka.timings?.Fajr}</span>
                <span>{maka.timings?.Dhuhr}</span>
                <span>{maka.timings?.Asr}</span>
                <span>{maka.timings?.Maghrib}</span>
                <span>{maka.timings?.Isha}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="citys">
          <img src="https://i.pinimg.com/564x/a8/af/1d/a8af1d630801ec948602fba1433df9ae.jpg" alt="New york" />
          <div className="cont_r">
            <h4>New York</h4>
            <div className="tab">
              <div className="t_head">
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <div className="t_body">
                <span>{new_y.timings?.Fajr}</span>
                <span>{new_y.timings?.Dhuhr}</span>
                <span>{new_y.timings?.Asr}</span>
                <span>{new_y.timings?.Maghrib}</span>
                <span>{new_y.timings?.Isha}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="citys">
          <img src="https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sedny" />
          <div className="cont_r">
            <h4>Seydney</h4>
            <div className="tab">
              <div className="t_head">
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <div className="t_body">
                <span>{sydney.timings?.Fajr}</span>
                <span>{sydney.timings?.Dhuhr}</span>
                <span>{sydney.timings?.Asr}</span>
                <span>{sydney.timings?.Maghrib}</span>
                <span>{sydney.timings?.Isha}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="citys" style={{width : '84%'}}>
          <img src="https://i.pinimg.com/564x/0a/43/5d/0a435d788ebd00f8d4f440b6b8e49d07.jpg" alt="jerusalem" style={{width : '67.5%'}}/>
          <div className="cont_r" style={{width : '100% '}}>
            <h4>Jerusalem</h4>
            <div className="tab" >
              <div className="t_head">
                <span>Fajr</span>
                <span>Dhuhr</span>
                <span>Asr</span>
                <span>Maghrib</span>
                <span>Isha</span>
              </div>
              <div className="t_body">
                <span>{jerusalem.timings?.Fajr}</span>
                <span>{jerusalem.timings?.Dhuhr}</span>
                <span>{jerusalem.timings?.Asr}</span>
                <span>{jerusalem.timings?.Maghrib}</span>
                <span>{jerusalem.timings?.Isha}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <div>
        <p>Position: {position ? `${position.latitude}, ${position.longitude}` : 'Fetching position...'}</p>
      <p>City: {city ? city : 'Fetching city...'}</p>
      </div> */}
    </div>

  );
};

export default Result;

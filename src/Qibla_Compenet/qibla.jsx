import React, { useEffect, useState } from 'react';
import './qibla.scss';

const Qibla = () => {
  const [position, setPosition] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);

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

    const interval = setInterval(fetchLocation, 1000); // Fetch location every 1 second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchQibla = async () => {
      try {
        if (position && position.latitude && position.longitude) {
          const response = await fetch(
            `https://api.aladhan.com/v1/qibla/${position.latitude}/${position.longitude}`
          );
          const data = await response.json();
          setQiblaDirection(data.data.direction);
        }
      } catch (error) {
        console.error('Error fetching Qibla:', error);
      }
    };

    const interval = setInterval(fetchQibla, 1000); // Fetch Qibla direction every 1 second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [position]);

  console.log('Position:', position);
  console.log('Qibla Direction:', qiblaDirection);

  return (
    <>
      {qiblaDirection !== null && qiblaDirection !== undefined && (
        <>
          <h1>Qibla Direction: {qiblaDirection}</h1>
          <div className="qibla-direction">
            <h3>Qibla Direction:</h3>
            <p>{qiblaDirection} degrees</p>
            <div className="qibla-box" style={{ transform: 'rotate(-90deg)' }}>
              <div
                className="qibla-arrow"
                style={{
                  transform: `rotate(${qiblaDirection}deg)`,
                  backgroundColor: 'black',
                  width: '20px',
                  height: '500px',
                  marginTop: '-50%',
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Qibla;
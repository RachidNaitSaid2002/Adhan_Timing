import './date.scss';
import React from 'react';
import moment from 'moment-hijri';

const Date_c = () => {
    
  const currentDate = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const Day = currentDate.toLocaleDateString('en-US',  { weekday: 'long' });
  const hijriDate = moment().format('iYYYY/iD/iMMMM');
  const day_ar = currentDate.toLocaleDateString('ar-SA',  { weekday: 'long' });

    return (
        <>
            <div className="date">
                <div className="day">
                    <span class="material-symbols-outlined">
                        calendar_month
                    </span>
                    <span className='t_day'>Today Date</span>
                </div>
            </div>
            <div className="currentday">
                <span>{formattedDate}</span>
                <span>{Day}</span>
                <span>{day_ar}</span>
                <span>{hijriDate}</span>
            </div>
        </>
    )
}
export default Date_c;
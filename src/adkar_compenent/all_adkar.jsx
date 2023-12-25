import React, { useEffect, useState } from 'react';
import './all_adkar.scss';
import adkarData from './Adka.json';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';

const All_adkar = () => {
    const [data, setData] = useState();
    const [category, setCategory] = useState();
    const [index, setIndex] = useState();

   

    useEffect(() => {
        setData(adkarData);
    }, []);

    const handelchange = (categ, idx) => {
        setCategory(categ);
        setIndex(idx);
    };

    console.log("index", index);
    console.log("cat", category);

    return (
        <>
            <div className="all_sec">
                <div className="head_d">
                    <span>Al-Adkar</span>
                    <span>الاذكار</span>
                </div>
                <div className="title_T">
                    <span onClick={() => handelchange("أذكار الصباح", 0)}>أذكارالصباح</span>
                    <span onClick={() => handelchange("أذكار المساء", 0)}>أذكارالمساء</span>
                    <span onClick={() => handelchange("أذكار بعد السلام من الصلاة المفروضة", 0)}>أذكار بعد السلام من الصلاة المفروضة</span>
                    <span onClick={() => handelchange("تسابيح", 0)}>تسابيح</span>
                    <span onClick={() => handelchange("أذكار النوم", 0)}>أذكارالنوم</span>
                    <span onClick={() => handelchange("أذكار الاستيقاظ", 0)}>أذكارالاستيقاظ</span>
                    <span onClick={() => handelchange("أدعية قرآنية", 0)}>أدعية قرآنية</span>
                    <span onClick={() => handelchange("أدعية الأنبياء", 0)}>أدعيةالأنبياء</span>
                </div>
{/* 
                {data && category && index !== undefined && (
                    <div className="adhkar-list">
                        <span></span>
                        <ul>
                            {data && data[index][`${category}`].map((item, itemIndex) => (
                                <li >{item.content}</li>
                            ))}
                        </ul>
                    </div>
                )} */}
                {data && category && index !== undefined && (
                   <Swiper
                   style={{
                       '--swiper-navigation-color': 'hsl(127, 100%, 13%)',
                       '--swiper-pagination-color': 'hsl(127, 100%, 13%)',
                   }}
                   speed={600}
                   parallax={true}
                   pagination={{
                       clickable: true,
                   }}
                   navigation={true}
                   modules={[Parallax, Pagination, Navigation]}
                   className="mySwiper"
               >
                   <div
                       slot="container-start"
                       className="parallax-bg"
                       style={{
                           'background-color':
                               '#fff',
                       }}
                       data-swiper-parallax="-23%"
                   ></div>
                   {data && data[index][`${category}`].map((item) => (
                       <SwiperSlide>
                           <div className="title" data-swiper-parallax="-300">
                               {category}
                           </div>
                           <div className="subtitle" data-swiper-parallax="-200">
                               {item.description}
                           </div>
                           <div className="text" data-swiper-parallax="-100">
                               <p>{item.content}</p>
                           </div>
                       </SwiperSlide>
                   ))}
               </Swiper>
                )}
                <div className='vide'></div>
            </div>
        </>
    );
};

export default All_adkar;
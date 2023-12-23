import './adkar_random.scss';
import React, { useEffect, useState } from 'react';

const R_Adkar = () => {
    const [ran_dikr, setRdikr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://ayah.nawafdev.com/api/dekr?types=m,random`
                );
                const data = await response.json();
                setRdikr(data);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchData();
    }, []);
    console.log(ran_dikr)
    return (
        <>
            <div className="dikr">
                <div className="dikr_T">
                    <span class="material-symbols-outlined">
                        event
                    </span>
                    Today Dikr
                </div>
                    <div className="dikr_C">
                        <h1>{ ran_dikr && ran_dikr.content}</h1> 
                        <div className="dikr_Cc">
                            <span className="dicr">
                                {ran_dikr.description}
                            </span>
                            <span className="cat">
                                {ran_dikr.category}
                            </span>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default R_Adkar; 
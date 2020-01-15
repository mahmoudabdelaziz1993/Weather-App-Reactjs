import React from 'react'

export default function Weather(props) {
    const { country,
        city,
        description,
        icon,
        like,
        main,
        temp_min,
        temp_max } = props.data;
    return (
        <div className="container py-3">
            <div className="cards">
                <h1>{country} , {city}</h1>
                <h5 className="py-4">
                    {description} 
                </h5>
                <h5><i className={`wi ${icon} display-1`}></i></h5>
                <h5 className="py-3">{main}&deg;</h5>
                {/** Display min and max degree */ }
                { maxMin(temp_max, temp_min, like) }
                
            </div>
        </div>
    )
}
const maxMin = (max, min, like) => {
    return (
        <React.Fragment>
            <h5 >
                <span className="px-2">Day { max }&deg;&uarr;</span>|
            <span className="px-2">Night { min }&deg;&darr;</span>
            </h5>
            <h5 className="py-3">Feels like { like }&deg;</h5>
        </React.Fragment>
    )
}

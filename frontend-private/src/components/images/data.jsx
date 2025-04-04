import React from 'react'
import data from '../../assets/data.png'

const Data = () => {
    const style = {
        image: {
            height: '498px',
            width: '498px'
        },
        imageDetail: {
            height: '498px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '498px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={data} alt="Data" className="Data"/>
        </div>
    )
}
export default Data
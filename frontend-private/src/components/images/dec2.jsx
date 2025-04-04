import React from 'react'
import dec2 from '../../assets/dec2.png'

const img2 = () => {
    const style = {
        image: {
            height: '275px',
            width: '175px'
        },
        imageDetail: {
            height: '275px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '175px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={dec2} alt="Dec. 2" className="Dec2"/>
        </div>
    )
}
export default img2
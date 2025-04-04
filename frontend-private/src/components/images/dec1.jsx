import React from 'react'
import dec1 from '../../assets/dec1.png'

const img1 = () => {
    const style = {
        image: {
            height: '208px',
            width: '208px'
        },
        imageDetail: {
            height: '208px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '208px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={dec1} alt="Dec. 1" className="Dec1"/>
        </div>
    )
}
export default img1
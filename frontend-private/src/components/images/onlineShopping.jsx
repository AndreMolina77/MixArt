import React from 'react'
import onlineshopping from '../../assets/online-shopping.png'

const OnlineShopping = () => {
    const style = {
        image: {
            height: '458px',
            width: '458px'
        },
        imageDetail: {
            height: '458px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '458px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={onlineshopping} alt="Online shopping" className="OnlineShopping"/>
        </div>
    )
}
export default OnlineShopping
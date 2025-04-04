import React from 'react'
import museum2 from '../../assets/museum-1.png'

const Museum2 = () => {
    const style = {
        image: {
            height: '499px',
            width: '499px'
        },
        imageDetail: {
            height: '499px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '499px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={museum2} alt="Museum" className="Museum2"/>
        </div>
    )
}
export default Museum2
import React from 'react'
import museum from '../../assets/museum-1.png'

const Museum = () => {
    const style = {
        image: {
            height: '453px',
            width: '453px'
        },
        imageDetail: {
            height: '453px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '453px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img src={museum} alt="Museum" className="Museum"/>
        </div>
    )
}
export default Museum
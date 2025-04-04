import React from 'react'
import monogramHq1 from  '../../assets/monogram-hq.png'

const Icon = () => {
    const styles = {
        image: {
            height: '98px',
            width: '98px',
        },
        monogramHq: {
            height: '98px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '98px'
        }
    }
    return (
        <div className="image" style={styles.image}>
            <img className="monogram-hq" alt="Monogram hq" src={monogramHq1} style={styles.monogramHq}/>
        </div>
    )
}
export default Icon
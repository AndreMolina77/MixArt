import React from 'react'
import logoNoBackground1 from '../../assets/logo.png'

const Logo = () => {
    const style = {
        image: {
            height: '241px',
            width: '541px'
        },
        logoNoBackground: {
            height: '241px',
            left: '0',
            objectFit: 'cover',
            position: 'fixed',
            top: '0',
            width: '541px'
        }
    }
    return (
        <div className="image" style={style.image}>
            <img className="logo-no-background" alt="Logo no background" src={logoNoBackground1}/>
        </div>
   )
}
export default Logo
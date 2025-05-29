// No se por que no se usan useEffect ni useState en el hook, pero se usan en el componente Login.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useFetch =()=> {
    const SERVER_URL = 'http://localhost:4000/api/'

    const useLogin = async (email, password)=>{
        const response = await fetch(`${SERVER_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            throw new Error('Error en la autenticación: ' + response.statusText)
        }
        const data = await response.json()
        
        alert(data.message)
        return data
    }
    return { useLogin }
}
export default useFetch
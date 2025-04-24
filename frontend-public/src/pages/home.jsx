import React from 'react'
import Breadcrumbs from '../components/breadcrumbs.jsx'

const Home = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs/>
        <h1 className="text-3xl font-bold text-[#7A6E6E] mt-4">Bienvenido a MixArt</h1>
        <p className="mt-4 text-[#7A6E6E]">Aquí irá el contenido principal...</p>
      </div>
    )
}
export default Home
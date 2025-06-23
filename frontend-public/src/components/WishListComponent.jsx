import React from 'react'
import ProductCard from '../components/productcard.jsx'
import TransparentButton from '../components/transparentbutton.jsx'
import SmallLifeForms from '../assets/slfiii.png'
import MorningRain from '../assets/mriii.png'
import AfterRain from '../assets/ariii.png'
import Larkspur from '../assets/larkspur.png'

const WishlistComponent = () => {
    const wishlistProducts = [
        { id: 1, ProductName: "Small Life forms III", Price: "$370", FormerPrice: "$420", ImageSrc: SmallLifeForms, Discount: "30%", ShowTrash: true },
        { id: 2, ProductName: "Morning Rain III", Price: "$500", ImageSrc: MorningRain, ShowTrash: true },
        { id: 3, ProductName: "After Rain III", Price: "$1,120", ImageSrc: AfterRain,  ShowTrash: true },
        { id: 4, ProductName: "Larkspur", Price: "$1,560", ImageSrc: Larkspur,  ShowTrash: true }
    ]
    return (
        <div className="w-full font-[Alexandria]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-normal text-[#7A6E6E]">Lista de deseos (4)</h2>
                <div className="w-48">
                <TransparentButton Text="Mover todo al carrito" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
                {wishlistProducts.map(product => (
                <div key={product.id} className="flex justify-center">
                    <ProductCard Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} ShowTrash={product.ShowTrash}/>
                </div>
                ))}
            </div>
        </div>
    )
}
export default WishlistComponent
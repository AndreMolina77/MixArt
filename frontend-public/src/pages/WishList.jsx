import { useWishlist } from '../hooks/useWishlist.js'
import { useCart } from '../hooks/useCart.js'
import ProductCard from '../components/Cards/ProductCard.jsx'
import Button from '../components/Buttons/Button.jsx'
import TransparentButton from '../components/Buttons/TransparentButton.jsx'
import usePublicDataArticles from '../hooks/useDataArticles.jsx'
import usePublicDataArtPieces from '../hooks/useDataArtPieces.jsx'


const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { articles } = usePublicDataArticles()
  const { artPieces } = usePublicDataArtPieces()

  // Funcion de transformacion (igual que en las otras paginas)
  const allProducts = [...(articles || []), ...(artPieces || [])]
  const transformRecommendedProduct = (item, index) => {
    if (!item || !item._id) {
      console.log('❌ WishList - Invalid item:', item)
      return null
    }
    
    const isArticle = item.hasOwnProperty('stock')
    const transformedProduct = {
      id: item._id,  // ← USAR DIRECTAMENTE _id
      ProductName: isArticle ? item.articleName : item.artPieceName,
      Price: `$${item.price}`,
      FormerPrice: item.discount > 0 ? `$${(item.price / (1 - item.discount/100)).toFixed(0)}` : null,
      ImageSrc: item.image || '/placeholder-image.jpg',
      Discount: item.discount > 0 ? `${item.discount}%` : null,
      ShowView: true,
      ShowWishList: true,
      Rating: Math.floor(Math.random() * 2) + 4,
      ReviewCount: Math.floor(Math.random() * 50) + 50,
      IsNew: Math.random() > 0.8,
      originalData: item,
      isArticle: isArticle
    }
    const recommendedProducts = allProducts
      .slice(0, 4)
      .map(transformRecommendedProduct)
      .filter(product => product !== null)

    console.log('🎯 WishList - Recommended products:', recommendedProducts)
    
    console.log('✅ WishList - Transformed product:', transformedProduct.id, transformedProduct.ProductName)
    return transformedProduct
  }

  
  const moveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        ProductName: item.name,
        Price: `$${item.price}`,
        ImageSrc: item.image,
        originalData: item.originalData,
        isArticle: item.isArticle
      })
    })
    clearWishlist()
    alert('Todos los productos han sido movidos al carrito')
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl font-[Alexandria]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-normal text-[#7A6E6E]">Lista de deseos ({wishlistItems.length})</h2>
        <div className="w-64">
          {wishlistItems.length > 0 ? (
            <Button Text="Mover todo al carrito" onClick={moveAllToCart} />
          ) : (
            <TransparentButton Text="Lista vacía" />
          )}
        </div>
      </div>
      {/* Productos en wishlist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {wishlistItems.length > 0 ? (
          wishlistItems.map(product => (
            <div key={product.id} className="flex justify-center">
              <ProductCard 
                id={product.id}
                ProductName={product.name}
                Price={`$${product.price}`}
                FormerPrice={product.discount > 0 ? `$${(product.price / (1 - product.discount/100)).toFixed(0)}` : null}
                ImageSrc={product.image}
                Discount={product.discount > 0 ? `${product.discount}%` : null}
                ShowTrash={true}
                originalData={product.originalData || {}}
                isArticle={product.isArticle || false}
              />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-12">
            <h3 className="text-xl text-[#7A6E6E] mb-4">Tu lista de deseos está vacía</h3>
            <p className="text-[#7A6E6E] mb-6">Explora nuestros productos y agrega tus favoritos</p>
            <Button Text="Explorar productos" to="/" />
          </div>
        )}
      </div>
      {/* Productos recomendados */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="bg-[#E07A5F] w-6 h-12 rounded-lg mr-2"></div>
          <h2 className="text-lg font-normal text-[#7A6E6E]">Sólo para ti</h2>
        </div>
        <div className="w-64">
          <TransparentButton Text="Ver todo" to="/catalogo" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map(product => (
          <div key={product.id} className="flex justify-center">
            <ProductCard id={product.id} Discount={product.Discount} ImageSrc={product.ImageSrc} ProductName={product.ProductName} Price={product.Price} FormerPrice={product.FormerPrice} Rating={product.Rating} ReviewCount={product.ReviewCount} IsNew={product.IsNew} ShowView={product.ShowView}/>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Wishlist
import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const ItemsSelector = ({ value = [], onChange, articlesData, artPiecesData, disabled = false, onTotalChange }) => {
  const [items, setItems] = useState(value)
  // Sincronizar con el valor externo
  useEffect(() => {
    setItems(value)
  }, [value])
  // Notificar cambios al padre SOLO cuando items cambia internamente
  const notifyChanges = (newItems) => {
    if (onChange) {
      onChange(newItems)
    }
    // Calcular y notificar el total
    if (onTotalChange) {
      const total = newItems.reduce((sum, item) => sum + (item.subtotal || 0), 0)
      onTotalChange(total)
    }
  }
  const addItem = () => {
    const newItem = {
      itemType: 'Article',
      itemId: '',
      quantity: 1,
      subtotal: 0
    }
    const newItems = [...items, newItem]
    setItems(newItems)
    notifyChanges(newItems)
  }
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    notifyChanges(newItems)
  }
  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    // Si cambia el tipo de item, limpiar el itemId
    if (field === 'itemType') {
      newItems[index].itemId = ''
      newItems[index].subtotal = 0
    }
    // Si cambia itemId o quantity, recalcular subtotal
    if (field === 'itemId' || field === 'quantity') {
      const item = newItems[index]
      if (item.itemId && item.quantity) {
        const product = getProductById(item.itemType, item.itemId)
        if (product) {
          newItems[index].subtotal = product.price * item.quantity
        }
      }
    }
    setItems(newItems)
    notifyChanges(newItems)
  }
  const getProductById = (itemType, itemId) => {
    if (itemType === 'Article' && articlesData?.articles) {
      return articlesData.articles.find(article => article._id === itemId)
    } else if (itemType === 'ArtPiece' && artPiecesData?.artPieces) {
      return artPiecesData.artPieces.find(artPiece => artPiece._id === itemId)
    }
    return null
  }
  const getAvailableProducts = (itemType) => {
    if (itemType === 'Article' && articlesData?.articles) {
      return articlesData.articles.map(article => ({
        value: article._id,
        label: `${article.articleName} - $${article.price}`
      }))
    } else if (itemType === 'ArtPiece' && artPiecesData?.artPieces) {
      return artPiecesData.artPieces.map(artPiece => ({
        value: artPiece._id,
        label: `${artPiece.artPieceName} - $${artPiece.price}`
      }))
    }
    return []
  }
  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.subtotal || 0), 0)
  }
  const baseInputClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg font-[Alexandria] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F]"
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#7A6E6E] font-[Alexandria]">
          Productos del Pedido
        </label>
        <button
          type="button"
          onClick={addItem}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-[#E07A5F] text-white rounded-lg hover:bg-[#E07A5F]/90 transition-colors disabled:opacity-50 font-[Alexandria] text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>
      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          <p className="font-[Alexandria]">No hay productos en este pedido</p>
          <p className="text-sm">Haz clic en "Agregar Producto" para comenzar</p>
        </div>
      )}
      {items.map((item, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-[#7A6E6E] font-[Alexandria]">
              Producto #{index + 1}
            </span>
            <button type="button" onClick={() => removeItem(index)} disabled={disabled} className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Tipo de Producto */}
            <div>
              <label className="block text-sm text-[#7A6E6E] mb-1 font-[Alexandria]">Tipo</label>
              <select value={item.itemType} onChange={(e) => updateItem(index, 'itemType', e.target.value)} disabled={disabled} className={baseInputClasses}>
                <option value="Article">Artículo</option>
                <option value="ArtPiece">Pieza de Arte</option>
              </select>
            </div>
            {/* Producto */}
            <div>
              <label className="block text-sm text-[#7A6E6E] mb-1 font-[Alexandria]">Producto</label>
              <select value={item.itemId} onChange={(e) => updateItem(index, 'itemId', e.target.value)} disabled={disabled} className={baseInputClasses}>
                <option value="">Seleccionar producto</option>
                {getAvailableProducts(item.itemType).map(product => (
                  <option key={product.value} value={product.value}>
                    {product.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Cantidad */}
            <div>
              <label className="block text-sm text-[#7A6E6E] mb-1 font-[Alexandria]">Cantidad</label>
              <input type="number" min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                disabled={disabled}
                className={baseInputClasses}
              />
            </div>
            {/* Subtotal */}
            <div>
              <label className="block text-sm text-[#7A6E6E] mb-1 font-[Alexandria]">Subtotal</label>
              <input type="text" value={`$${(item.subtotal || 0).toFixed(2)}`} disabled className={`${baseInputClasses} bg-gray-100 cursor-not-allowed`}/>
            </div>
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <div className="text-right">
            <p className="text-sm text-[#7A6E6E] font-[Alexandria]">Total del Pedido:</p>
            <p className="text-xl font-bold text-[#E07A5F] font-[Alexandria]">
              ${getTotalAmount().toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default ItemsSelector
import { memo, useCallback } from 'react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product)
  }, [product, onAddToCart])

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.isNew && <span className="product-badge new">New</span>}
        {product.isBestseller && <span className="product-badge bestseller">Bestseller</span>}
        {!product.inStock && <span className="product-badge out-of-stock">Out of Stock</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-details">
          {product.size && <span className="product-size">{product.size}</span>}
          <div className="product-price">
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="current-price">${product.price.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="btn add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Bag' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
})

export default ProductCard

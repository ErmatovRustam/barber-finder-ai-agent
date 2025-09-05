import { memo, useCallback, useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import { products, categories, type Product } from '../data/products'
import { useCart } from '../contexts/CartContext'

const HairProducts = memo(function HairProducts() {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products
    }
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product)
  }, [addToCart])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  return (
    <section id="products" className="hair-products">
      <div className="container">
        <div className="section-header">
          <h2>Hair Products</h2>
          <p>Premium hair care products for the hair obsessed</p>
        </div>

        <div className="products-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  )
})

export default HairProducts

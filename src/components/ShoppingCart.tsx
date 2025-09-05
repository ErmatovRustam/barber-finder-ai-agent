import { memo, useCallback, useMemo } from 'react'
import type { Product } from '../data/products'

interface CartItem extends Product {
  quantity: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: () => void
}

const ShoppingCart = memo(function ShoppingCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: ShoppingCartProps) {
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cartItems])

  const handleQuantityChange = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId)
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
  }, [onUpdateQuantity, onRemoveItem])

  const handleRemoveItem = useCallback((productId: string) => {
    onRemoveItem(productId)
  }, [onRemoveItem])

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Bag ({cartItems.length})</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your bag is empty</p>
              <button className="btn" onClick={onClose}>Start Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>{item.size}</p>
                      <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="btn checkout-btn" onClick={onCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default ShoppingCart

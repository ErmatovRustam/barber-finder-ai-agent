import { memo, useCallback } from 'react'
import { useCart } from '../contexts/CartContext'

interface CartWidgetProps {
  onOpenCart: () => void
}

const CartWidget = memo(function CartWidget({ onOpenCart }: CartWidgetProps) {
  const { getTotalItems, getTotalPrice } = useCart()
  const itemCount = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleClick = useCallback(() => {
    onOpenCart()
  }, [onOpenCart])

  return (
    <button className="cart-widget" onClick={handleClick}>
      <div className="cart-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
        </svg>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </div>
      <div className="cart-info">
        <span className="cart-label">Cart</span>
        {totalPrice > 0 && (
          <span className="cart-total">${totalPrice.toFixed(2)}</span>
        )}
      </div>
    </button>
  )
})

export default CartWidget

import { memo, useCallback, useState } from 'react'
import type { Product } from '../data/products'

interface CartItem extends Product {
  quantity: number
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onOrderComplete: () => void
}

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

const CheckoutModal = memo(function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onOrderComplete 
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal >= 100 ? 0 : 9.99
  const tax = subtotal * 0.0875 // 8.75% tax rate
  const total = subtotal + shipping + tax

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setLoading(false)
    setSuccess(true)
    
    // Close modal after success
    setTimeout(() => {
      onOrderComplete()
      onClose()
      setSuccess(false)
    }, 2000)
  }, [onOrderComplete, onClose])

  const handleClose = useCallback(() => {
    if (!loading) {
      onClose()
    }
  }, [loading, onClose])

  if (!isOpen) return null

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="checkout-close" onClick={handleClose}>×</button>
        </div>

        <div className="checkout-content">
          {success ? (
            <div className="checkout-success">
              <div className="success-icon">✓</div>
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="checkout-sections">
                <div className="checkout-section">
                  <h3>Shipping Information</h3>
                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="checkout-section">
                  <h3>Payment Information</h3>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-totals">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="summary-line">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-line total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn checkout-submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
})

export default CheckoutModal

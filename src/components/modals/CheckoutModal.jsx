import React, { useState } from 'react';

export default function CheckoutModal({
  checkoutOpen,
  setCheckoutOpen,
  cart,
  subtotal,
  deliveryCharge,
  profileAddresses = [],
  setProfileAddresses,
  walletBalance = 450,
  onPlaceOrder,
  setTrackOpen,
  setTrackInput,
  addToast
}) {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review, 4: Success
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    block: 'Hostel Block H-4',
    room: '',
    landmark: ''
  });

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'wallet' | 'cod' | 'netbanking'
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'custom'
  const [upiId, setUpiId] = useState('');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Coupon states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ type: '', text: '' });

  // Processing state & placed order info
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  if (!checkoutOpen) return null;

  // Calculate pricing
  const platformFee = 5;
  const rawTotal = subtotal + deliveryCharge + platformFee;
  const finalTotal = Math.max(0, rawTotal - couponDiscount);

  // Address handling
  const addresses = profileAddresses.length > 0 ? profileAddresses : [
    'Hostel Block H-4, Room 302',
    'Central Library, Cubicle 12'
  ];

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddr.room.trim()) {
      addToast('Please enter room number or desk details');
      return;
    }
    const formatted = `${newAddr.block}, Room ${newAddr.room}${newAddr.landmark ? ` (${newAddr.landmark})` : ''}`;
    if (setProfileAddresses) {
      setProfileAddresses(prev => [...prev, formatted]);
    }
    setSelectedAddressIndex(addresses.length);
    setShowAddForm(false);
    setNewAddr({ fullName: '', phone: '', block: 'Hostel Block H-4', room: '', landmark: '' });
    addToast('New delivery address added!');
  };

  // Coupon application
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'CAMPUS10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon('CAMPUS10');
      setCouponDiscount(discount);
      setCouponMsg({ type: 'success', text: '10% Campus Discount Applied!' });
      addToast('Coupon CAMPUS10 applied! Saved ₹' + discount);
    } else if (code === 'WELCOME50') {
      const discount = 50;
      setAppliedCoupon('WELCOME50');
      setCouponDiscount(discount);
      setCouponMsg({ type: 'success', text: 'Flat ₹50 Welcome Discount Applied!' });
      addToast('Coupon WELCOME50 applied!');
    } else if (code === 'FREESHIP') {
      const discount = deliveryCharge;
      setAppliedCoupon('FREESHIP');
      setCouponDiscount(discount);
      setCouponMsg({ type: 'success', text: 'Free Campus Runner Delivery Applied!' });
      addToast('Free delivery coupon applied!');
    } else {
      setCouponMsg({ type: 'error', text: 'Invalid coupon code. Try CAMPUS10 or WELCOME50' });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput('');
    setCouponMsg({ type: '', text: '' });
  };

  // Final Order Placement
  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const selectedAddrStr = addresses[selectedAddressIndex] || addresses[0];
      const newOrderId = 'CH-' + Math.floor(10000 + Math.random() * 90000);
      
      let payMethodLabel = 'Cash on Delivery';
      if (paymentMethod === 'upi') payMethodLabel = `UPI (${upiOption.toUpperCase()})`;
      else if (paymentMethod === 'card') payMethodLabel = 'Credit/Debit Card';
      else if (paymentMethod === 'wallet') payMethodLabel = 'Campus Wallet';
      else if (paymentMethod === 'netbanking') payMethodLabel = `Net Banking (${selectedBank})`;

      const orderData = {
        id: newOrderId,
        date: new Date().toISOString().split('T')[0],
        total: Math.round(finalTotal),
        location: selectedAddrStr,
        status: 'shipping',
        items: cart.map(i => `${i.title} (${i.quantity}x)`).join(', '),
        runner: 'Rahul S. (Campus Runner)',
        paymentMethod: payMethodLabel,
        estTime: '10 - 15 mins'
      };

      onPlaceOrder(orderData);
      setPlacedOrderInfo(orderData);
      setIsProcessing(false);
      setStep(4); // Move to Success screen
    }, 1500);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    // Reset modal state after close animation
    setTimeout(() => {
      setStep(1);
      setPlacedOrderInfo(null);
    }, 300);
  };

  const handleTrackNewOrder = () => {
    if (placedOrderInfo && setTrackInput && setTrackOpen) {
      setTrackInput(placedOrderInfo.id);
      setCheckoutOpen(false);
      setTrackOpen(true);
    }
  };

  return (
    <div className={`modal-backdrop checkout-modal-backdrop ${checkoutOpen ? 'open' : ''}`}>
      <div className="modal-content checkout-modal-content" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={handleClose}>×</button>

        {/* Modal Header */}
        <div className="checkout-modal-header">
          <h3>
            {step === 4 ? '🎉 Order Placed Successfully!' : '⚡ Campus Quick Checkout'}
          </h3>
          {step < 4 && (
            <div className="checkout-stepper">
              <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-num">{step > 1 ? '✓' : '1'}</span>
                <span className="step-label">Address</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-num">{step > 2 ? '✓' : '2'}</span>
                <span className="step-label">Payment</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                <span className="step-label">Review</span>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-modal-body">
          {/* STEP 1: ADDRESS SELECTION */}
          {step === 1 && (
            <div className="checkout-step-container">
              <h4 className="checkout-section-title">Select Delivery Location</h4>
              <p className="checkout-section-desc">Where should our Campus Runner deliver your order?</p>

              <div className="address-list">
                {addresses.map((addr, idx) => (
                  <label 
                    key={idx} 
                    className={`address-card ${selectedAddressIndex === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedAddressIndex(idx)}
                  >
                    <input 
                      type="radio" 
                      name="deliveryAddress" 
                      checked={selectedAddressIndex === idx} 
                      onChange={() => setSelectedAddressIndex(idx)} 
                    />
                    <div className="address-info">
                      <div className="address-tag">
                        {idx === 0 ? '🏠 Primary Hostel' : `📍 Saved Location ${idx + 1}`}
                      </div>
                      <p className="address-text">{addr}</p>
                    </div>
                  </label>
                ))}
              </div>

              {!showAddForm ? (
                <button 
                  type="button" 
                  className="btn-add-new-address"
                  onClick={() => setShowAddForm(true)}
                >
                  + Add New Hostel / Campus Location
                </button>
              ) : (
                <form className="add-address-form" onSubmit={handleAddNewAddress}>
                  <h5>Add New Delivery Location</h5>
                  <div className="form-grid">
                    <div>
                      <label>Hostel / Building Block</label>
                      <select 
                        value={newAddr.block} 
                        onChange={(e) => setNewAddr({ ...newAddr, block: e.target.value })}
                        className="modal-input"
                      >
                        <option value="Hostel Block H-1">Hostel Block H-1</option>
                        <option value="Hostel Block H-2">Hostel Block H-2</option>
                        <option value="Hostel Block H-3">Hostel Block H-3</option>
                        <option value="Hostel Block H-4">Hostel Block H-4</option>
                        <option value="Girls Hostel GH-1">Girls Hostel GH-1</option>
                        <option value="Girls Hostel GH-2">Girls Hostel GH-2</option>
                        <option value="Central Library">Central Library</option>
                        <option value="Academic Block A">Academic Block A</option>
                        <option value="Campus Canteen Area">Campus Canteen Area</option>
                      </select>
                    </div>
                    <div>
                      <label>Room / Desk / Cubicle No.</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Room 302 or Desk 14" 
                        value={newAddr.room} 
                        onChange={(e) => setNewAddr({ ...newAddr, room: e.target.value })}
                        className="modal-input" 
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <label>Landmark (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Near West Staircase / 3rd Floor" 
                      value={newAddr.landmark} 
                      onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                      className="modal-input" 
                    />
                  </div>
                  <div className="form-actions" style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Save & Select</button>
                    <button type="button" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              )}

              <div className="checkout-actions">
                <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                <button 
                  className="btn btn-primary btn-next-step"
                  onClick={() => setStep(2)}
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="checkout-step-container">
              <h4 className="checkout-section-title">Choose Payment Method</h4>
              <p className="checkout-section-desc">Select how you'd like to pay for this order</p>

              <div className="payment-options-grid">
                {/* 1. UPI Payment */}
                <div 
                  className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="payment-option-header">
                    <label>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')} 
                      />
                      <span className="pay-title">📱 UPI / Instant Mobile Pay</span>
                    </label>
                    <span className="pay-badge fast">Fastest</span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="payment-sub-content">
                      <div className="upi-apps-row">
                        <button 
                          type="button"
                          className={`upi-app-btn ${upiOption === 'gpay' ? 'active' : ''}`}
                          onClick={() => setUpiOption('gpay')}
                        >
                          Google Pay
                        </button>
                        <button 
                          type="button"
                          className={`upi-app-btn ${upiOption === 'phonepe' ? 'active' : ''}`}
                          onClick={() => setUpiOption('phonepe')}
                        >
                          PhonePe
                        </button>
                        <button 
                          type="button"
                          className={`upi-app-btn ${upiOption === 'paytm' ? 'active' : ''}`}
                          onClick={() => setUpiOption('paytm')}
                        >
                          Paytm
                        </button>
                        <button 
                          type="button"
                          className={`upi-app-btn ${upiOption === 'custom' ? 'active' : ''}`}
                          onClick={() => setUpiOption('custom')}
                        >
                          UPI ID
                        </button>
                      </div>

                      {upiOption === 'custom' && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <input 
                            type="text" 
                            className="modal-input"
                            placeholder="Enter VPA / UPI ID (e.g. mobile@upi)" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Campus Wallet */}
                <div 
                  className={`payment-option-card ${paymentMethod === 'wallet' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="payment-option-header">
                    <label>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'wallet'} 
                        onChange={() => setPaymentMethod('wallet')} 
                      />
                      <span className="pay-title">💳 Campus Student Wallet</span>
                    </label>
                    <span className="wallet-balance-tag">Balance: ₹{walletBalance}</span>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <div className="payment-sub-content">
                      {walletBalance >= finalTotal ? (
                        <p style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 600 }}>
                          ✓ Instant 1-Click checkout using your Student Wallet balance!
                        </p>
                      ) : (
                        <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>
                          ⚠️ Low balance (₹{walletBalance}). Remaining ₹{(finalTotal - walletBalance).toFixed(0)} can be paid via cash or UPI.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Cards */}
                <div 
                  className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="payment-option-header">
                    <label>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')} 
                      />
                      <span className="pay-title">💳 Credit / Debit Card</span>
                    </label>
                    <div className="card-icons-inline">Visa • Mastercard • RuPay</div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="payment-sub-content">
                      <input 
                        type="text" 
                        className="modal-input" 
                        placeholder="Card Number (16 digits)" 
                        maxLength={19}
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input 
                          type="text" 
                          className="modal-input" 
                          placeholder="MM/YY" 
                          maxLength={5}
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        />
                        <input 
                          type="password" 
                          className="modal-input" 
                          placeholder="CVV" 
                          maxLength={4}
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Cash on Delivery */}
                <div 
                  className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="payment-option-header">
                    <label>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')} 
                      />
                      <span className="pay-title">💵 Cash on Delivery / Pay Runner</span>
                    </label>
                    <span className="pay-badge">No Prepayment</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="payment-sub-content">
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Pay cash or UPI directly to the Campus Runner when your order arrives at your hostel room.
                      </p>
                    </div>
                  )}
                </div>

                {/* 5. Net Banking */}
                <div 
                  className={`payment-option-card ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="payment-option-header">
                    <label>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'netbanking'} 
                        onChange={() => setPaymentMethod('netbanking')} 
                      />
                      <span className="pay-title">🏦 Net Banking</span>
                    </label>
                  </div>
                  {paymentMethod === 'netbanking' && (
                    <div className="payment-sub-content">
                      <select 
                        value={selectedBank} 
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="modal-input"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="checkout-actions">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button 
                  className="btn btn-primary btn-next-step"
                  onClick={() => setStep(3)}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & COUPON */}
          {step === 3 && (
            <div className="checkout-step-container">
              <h4 className="checkout-section-title">Order Review & Payment</h4>
              
              <div className="review-grid">
                {/* Left Column: Items & Details */}
                <div className="review-left">
                  {/* Delivery Location Summary */}
                  <div className="review-card">
                    <div className="review-card-header">
                      <span>📍 Delivery Address</span>
                      <button className="btn-link" onClick={() => setStep(1)}>Change</button>
                    </div>
                    <p className="review-card-body">{addresses[selectedAddressIndex] || addresses[0]}</p>
                  </div>

                  {/* Payment Method Summary */}
                  <div className="review-card">
                    <div className="review-card-header">
                      <span>💳 Payment Method</span>
                      <button className="btn-link" onClick={() => setStep(2)}>Change</button>
                    </div>
                    <p className="review-card-body">
                      {paymentMethod === 'upi' && `UPI Mobile Pay (${upiOption.toUpperCase()})`}
                      {paymentMethod === 'card' && 'Credit / Debit Card'}
                      {paymentMethod === 'wallet' && 'Campus Student Wallet'}
                      {paymentMethod === 'cod' && 'Cash on Delivery (Pay to Runner)'}
                      {paymentMethod === 'netbanking' && `Net Banking (${selectedBank})`}
                    </p>
                  </div>

                  {/* Items list */}
                  <div className="review-card">
                    <div className="review-card-header">
                      <span>📦 Bag Items ({cart.length})</span>
                    </div>
                    <div className="checkout-items-mini">
                      {cart.map(item => (
                        <div key={item.id} className="checkout-item-row">
                          <img src={item.image} alt={item.title} className="item-mini-thumb" />
                          <div className="item-mini-info">
                            <span className="item-mini-title">{item.title}</span>
                            <span className="item-mini-qty">Qty: {item.quantity}</span>
                          </div>
                          <span className="item-mini-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Pricing & Coupon */}
                <div className="review-right">
                  {/* Coupon Code Section */}
                  <div className="coupon-box">
                    <label className="coupon-label">🏷️ Have a Campus Coupon?</label>
                    {!appliedCoupon ? (
                      <div className="coupon-input-group">
                        <input 
                          type="text" 
                          placeholder="e.g. CAMPUS10" 
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="coupon-input"
                        />
                        <button className="btn btn-accent btn-apply-coupon" onClick={handleApplyCoupon}>
                          Apply
                        </button>
                      </div>
                    ) : (
                      <div className="applied-coupon-badge">
                        <span>🎉 <strong>{appliedCoupon}</strong> Applied (-₹{couponDiscount})</span>
                        <button className="btn-remove-coupon" onClick={handleRemoveCoupon}>×</button>
                      </div>
                    )}

                    {couponMsg.text && (
                      <div className={`coupon-msg ${couponMsg.type}`}>
                        {couponMsg.text}
                      </div>
                    )}

                    <div className="suggested-coupons">
                      <span className="suggested-tag" onClick={() => { setCouponInput('CAMPUS10'); }}>Use CAMPUS10 (10% OFF)</span>
                      <span className="suggested-tag" onClick={() => { setCouponInput('WELCOME50'); }}>Use WELCOME50 (₹50 OFF)</span>
                    </div>
                  </div>

                  {/* Price Bill Breakdown */}
                  <div className="bill-breakdown-card">
                    <div className="bill-row">
                      <span>Items Subtotal</span>
                      <span>₹{subtotal.toFixed(0)}</span>
                    </div>
                    <div className="bill-row">
                      <span>Campus Runner Fee</span>
                      <span>₹{deliveryCharge.toFixed(0)}</span>
                    </div>
                    <div className="bill-row">
                      <span>Platform & Tech Fee</span>
                      <span>₹{platformFee}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="bill-row discount">
                        <span>Campus Coupon Discount</span>
                        <span>-₹{couponDiscount}</span>
                      </div>
                    )}
                    <div className="bill-divider"></div>
                    <div className="bill-row total">
                      <span>Total Amount Payable</span>
                      <span className="total-price">₹{finalTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Pay button */}
                  <button 
                    className="btn btn-primary btn-place-order-large"
                    onClick={handleConfirmOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '⚡ Securing Order...' : `Pay ₹${finalTotal.toFixed(0)} & Place Order`}
                  </button>
                </div>
              </div>

              <div className="checkout-actions" style={{ marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>← Back to Payment</button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS / CONFIRMATION */}
          {step === 4 && placedOrderInfo && (
            <div className="order-success-container">
              <div className="success-icon-badge">
                <span>✓</span>
              </div>
              <h3>Order Confirmed!</h3>
              <p className="success-subtitle">
                Your order <strong>#{placedOrderInfo.id}</strong> has been assigned to a Campus Runner!
              </p>

              <div className="success-details-card">
                <div className="detail-row">
                  <span className="detail-label">Delivery Address</span>
                  <span className="detail-val">{placedOrderInfo.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-val">{placedOrderInfo.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Amount Paid</span>
                  <span className="detail-val highlight">₹{placedOrderInfo.total}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Est. Runner Arrival</span>
                  <span className="detail-val runner-tag">⚡ 10 - 15 Mins ({placedOrderInfo.runner})</span>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn btn-accent btn-track-order-now" onClick={handleTrackNewOrder}>
                  🚚 Track Live Delivery
                </button>
                <button className="btn btn-secondary" onClick={handleClose}>
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

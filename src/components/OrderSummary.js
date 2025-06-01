import React from "react";
import "../styles/OrderSummary.css";

const OrderSummary = ({ product, variant, quantity }) => {
  const subtotal = product.price * quantity;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="order-summary">
      <h3 className="summary-title">Your Order</h3>

      <div className="product-info">
        <img src={product.image} alt={product.name} className="product-image" />
        <div>
          <div className="product-name">{product.name}</div>
          <div className="product-variant">Variant: {variant}</div>
        </div>
      </div>

      <div className="summary-item">
        <span className="summary-label">Price:</span>
        <span className="summary-value">Rs. {product.price.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Quantity:</span>
        <span className="summary-value">{quantity}</span>
      </div>

      <div className="divider"></div>

      <div className="summary-item">
        <span className="summary-label">Subtotal:</span>
        <span className="summary-value">Rs. {subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Tax (10%):</span>
        <span className="summary-value">Rs. {tax.toFixed(2)}</span>
      </div>

      <div className="divider"></div>

      <div className="total-row">
        <span>Total:</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;

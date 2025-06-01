import React from "react";

const ProductCard = ({
  product,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
  onBuyNow,
}) => {
  return (
    <div className="product-card">
      <div className="product-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <p className="product-description">{product.description}</p>
          <div className="product-price">Rs. {product.price.toFixed(2)}</div>

          <div className="form-group">
            <label className="form-label">Variant</label>
            <select
              className="form-select"
              value={selectedVariant.value}
              onChange={(e) =>
                onVariantChange(
                  product.variants.find((v) => v.value === e.target.value)
                )
              }
            >
              {product.variants.map((variant) => (
                <option key={variant.value} value={variant.value}>
                  {variant.value}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              min="1"
              max={selectedVariant.inventory}
              value={quantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              className="form-input"
            />
          </div>

          <button onClick={onBuyNow} className="buy-button">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

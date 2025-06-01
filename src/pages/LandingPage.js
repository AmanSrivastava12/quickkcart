import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../api";
import ProductCard from "../components/ProductCard";

const LandingPage = ({ landingRef }) => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        setProduct(response.data);
        setSelectedVariant(response.data.variants[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, []);

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        variant: selectedVariant.value,
        quantity,
      },
    });
  };

  if (!product || !selectedVariant)
    return <div className="loading">Loading...</div>;

  return (
    <div ref={landingRef} className="landing-page">
      <ProductCard
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default LandingPage;

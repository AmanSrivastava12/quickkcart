import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../api";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      setOrderData(location.state);
    }
  }, [location, navigate]);

  const handleSubmit = async (formData) => {
    try {
      let status = "approved";
      if (formData.payment.cardNumber.startsWith("2")) {
        status = "declined";
      } else if (formData.payment.cardNumber.startsWith("3")) {
        status = "failed";
      }
      let response;
      if (status === "approved") {
        response = await createOrder(formData);
      }

      navigate("/thank-you", {
        state: {
          orderNumber: response.data.orderNumber,
          status: response.data.status,
        },
      });
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  if (!orderData) return <div className="loading-message">Loading...</div>;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-grid">
          <div>
            <h2 className="section-title">Shipping Information</h2>
            <CheckoutForm
              product={orderData.product}
              variant={orderData.variant}
              quantity={orderData.quantity}
              onSubmit={handleSubmit}
            />
          </div>
          <div>
            <h2 className="section-title">Order Summary</h2>
            <OrderSummary
              product={orderData.product}
              variant={orderData.variant}
              quantity={orderData.quantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

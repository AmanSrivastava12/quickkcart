import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrder } from "../api";

const ThanksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      const fetchOrder = async () => {
        try {
          const response = await getOrder(location.state.orderNumber);
          setOrder(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching order:", err);
          navigate("/");
        }
      };

      fetchOrder();
    }
  }, [location, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          {order.payment.status === "approved" ? (
            <>
              <h1 className="text-2xl font-bold text-green-600 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order! We've received it and are processing
                it now.
              </p>
            </>
          ) : order.payment.status === "declined" ? (
            <>
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Payment Declined
              </h1>
              <p className="text-gray-600 mb-6">
                We were unable to process your payment. Please check your
                payment details and try again.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-yellow-600 mb-4">
                Payment Error
              </h1>
              <p className="text-gray-600 mb-6">
                We encountered an error processing your payment. Please try
                again later or contact support.
              </p>
            </>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Details
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Order Number:</span>{" "}
              {order.orderNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Product</h3>
              <p className="text-gray-600">
                {order.product.name} ({order.product.variant})
              </p>
              <p className="text-gray-600">
                Quantity: {order.product.quantity}
              </p>
              <p className="text-gray-600">
                Price: Rs. {order.product.price.toFixed(2)} each
              </p>
              <p className="text-gray-600 font-medium mt-2">
                Total: Rs.
                {(order.product.price * order.product.quantity).toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900">
                Shipping Information
              </h3>
              <p className="text-gray-600">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.address}</p>
              <p className="text-gray-600">
                {order.customer.city}, {order.customer.state}{" "}
                {order.customer.zipCode}
              </p>
              <p className="text-gray-600">{order.customer.email}</p>
              <p className="text-gray-600">{order.customer.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;

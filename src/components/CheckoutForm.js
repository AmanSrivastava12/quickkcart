import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "../styles/CheckoutForm.css";

const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)")
    .refine(
      (val) => {
        const [month, year] = val.split("/").map(Number);
        const now = new Date();
        const expiry = new Date(2000 + year, month - 1);
        return expiry > now;
      },
      {
        message: "Expiry date must be in the future",
      }
    ),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

const CheckoutForm = ({ product, variant, quantity, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const handleFormSubmit = async (values) => {
    const orderData = {
      productId: product._id,
      variant,
      quantity,
      customer: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
      },
      payment: {
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
      },
    };

    await onSubmit(orderData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="checkout-form">
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input {...register("name")} className="form-input" />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input {...register("email")} className="form-input" />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input {...register("phone")} className="form-input" />
        {errors.phone && (
          <p className="error-message">{errors.phone.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Address</label>
        <input {...register("address")} className="form-input" />
        {errors.address && (
          <p className="error-message">{errors.address.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <input {...register("city")} className="form-input" />
        {errors.city && <p className="error-message">{errors.city.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">State</label>
        <input {...register("state")} className="form-input" />
        {errors.state && (
          <p className="error-message">{errors.state.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Zip Code</label>
        <input {...register("zipCode")} className="form-input" />
        {errors.zipCode && (
          <p className="error-message">{errors.zipCode.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Card Number</label>
        <input
          {...register("cardNumber")}
          className="form-input"
          placeholder="XXXX XXXX XXXX XXXX"
        />
        {errors.cardNumber && (
          <p className="error-message">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Expiry Date (MM/YY)</label>
        <input
          {...register("expiryDate")}
          className="form-input"
          placeholder="MM/YY"
        />
        {errors.expiryDate && (
          <p className="error-message">{errors.expiryDate.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">CVV</label>
        <input
          {...register("cvv")}
          type="password"
          className="form-input"
          placeholder="XXX"
        />
        {errors.cvv && <p className="error-message">{errors.cvv.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "Processing..." : "Complete Purchase"}
      </button>
    </form>
  );
};

export default CheckoutForm;

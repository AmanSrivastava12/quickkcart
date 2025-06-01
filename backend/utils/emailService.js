const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendApprovedEmail = async (order) => {
  const mailOptions = {
    from: `"Ecommerce Store" <order@${process.env.MAILTRAP_DOMAIN}>`,
    to: order.customer.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #${order.orderNumber} has been confirmed.</p>
      <h2>Order Summary</h2>
      <p>Product: ${order.product.name} (${order.product.variant})</p>
      <p>Quantity: ${order.product.quantity}</p>
      <p>Total: $${order.payment.amount.toFixed(2)}</p>
      <p>We'll notify you when your order ships.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendDeclinedEmail = async (order) => {
  const mailOptions = {
    from: `"Ecommerce Store" <order@${process.env.MAILTRAP_DOMAIN}>`,
    to: order.customer.email,
    subject: `Payment Declined - Order #${order.orderNumber}`,
    html: `
      <h1>Payment Declined</h1>
      <p>We were unable to process your payment for order #${order.orderNumber}.</p>
      <p>Please check your payment information and try again.</p>
      <p>If you believe this is an error, please contact support.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendErrorEmail = async (order) => {
  const mailOptions = {
    from: `"Ecommerce Store" <order@${process.env.MAILTRAP_DOMAIN}>`,
    to: order.customer.email,
    subject: `Payment Error - Order #${order.orderNumber}`,
    html: `
      <h1>Payment Processing Error</h1>
      <p>We encountered an error while processing your payment for order #${order.orderNumber}.</p>
      <p>Please try again later or contact support.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendApprovedEmail, sendDeclinedEmail, sendErrorEmail };

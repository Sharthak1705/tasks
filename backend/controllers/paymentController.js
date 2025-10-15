const Stripe = require('stripe');
const Payment = require('../models/payment');
const stripe = Stripe('sk_test_51QvE5VQ8viKcy6z5bfSXoH8p9nryyyjKqqGW1Iz2qBjhr3ot7GZjcrvS5XFbKU1WKK8kU6TbgbwdikiffIiq2irQ00RMYTPbMO');

exports.createCheckoutSession = async (req, res) => {
  const { email, product } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.title },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    await new Payment({ email, status: 'success', sessionId: session.id }).save();
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_STRIPE_WEBHOOK_SECRET');
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;

  if (event.type === 'checkout.session.completed') {
    Payment.findOneAndUpdate(
      { sessionId: session.id },
      { status: 'success' },
      { new: true },
      (err) => {
    if (err) console.error('Error updating payment status:', err);
      }
    );
  } else if (event.type === 'checkout.session.expired') {
    Payment.findOneAndUpdate(
      { sessionId: session.id },
      { status: 'failed' },
      { new: true },
      (err) => {
        if (err) console.error('Error updating payment status:', err);
      }
    );
  }
  res.json({ received: true });
};
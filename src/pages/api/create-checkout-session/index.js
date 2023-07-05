const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const product = await stripe.products.create({
    name: items.name,
    description: items.description,
    images: items.images,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: items.price,
    currency: "eur",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: items.quantity,
      },
    ],
    mode: "payment",
    success_url:
      "https://communio.vercel.app/cart/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://communio.vercel.app/cart/cancel",
  });

  res.status(200).json({ id: session.id });
};

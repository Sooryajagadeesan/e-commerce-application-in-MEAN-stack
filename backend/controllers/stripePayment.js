const stripe = require("stripe")("sk_test_51KZgXzSG1TDNbv5fJTjwP7EU21UbjdMhLYKbWgJIqH6ADdVydbLpew6tmRIkJMBb3biwROL4YXOPViPMaCaHZ2HR00lnmZ4UAY");


// stripe payment controller
const makePayment = async (req, res) => {
    const { items, userId} = req.body;
    let itemIds = items.map((item) => {
      return item._id
    })
    itemIds = JSON.stringify(itemIds);

    let lineItems = []

    // preparing the items to be displayed in the checkout form
    try {
      lineItems = items.map((item) => {
        return ({
          price_data: {
            currency:  "inr",
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100
          },
          quantity: item.quantity
        })
      })
    } catch(err) {
      lineItems = [{
        price_data: {
          currency:  "inr",
          product_data: {
            name: ""
          },
          unit_amount: 100
        },
        quantity: 1
      }]
    }

    // creating a session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['IN']
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:4200/order/payment/success/{CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/order/payment/failure/{CHECKOUT_SESSION_ID}',
      metadata: {
        "userId": userId,
        "itemIds":itemIds
      }
    });
    // sending the session id to the client
    res.json({ id: session.id });
}



module.exports = {
    makePayment
}
const fs = require("fs");
const path = require("path");

const stripe = require("stripe")("sk_test_..PUT YOUR STRIPE KEY HERE");
const endpointSecret = "PUT YOUR END POINT SECRET given by STRIPE HERE";

const { createOrder } = require("../controllers/order");
const { pushOrderIntoPurchases } = require("../controllers/user");

const accessWebHook = (request, response) => {
  // given by the stripe payment route
  const payload = request.body;
  // set by the stripe
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(402).send(`Webhook Error: ${err.message}`);
  }

  response.status(200).end();
  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // saving order into DB
    saveOrder(session);
  }
};

// save order in DB after successful payment
const saveOrder = async (session) => {
  await stripe.checkout.sessions.listLineItems(
    session.id,
    {},
    function (err, items) {
      if (!err) {
        let { itemIds, userId } = session.metadata;
        itemIds = JSON.parse(itemIds);

        let allItems = items.data;
        let cartItems = [];

        for (let i = 0; i < allItems.length; i++) {
          const newItem = {};
          newItem.product = itemIds[i];
          newItem.name = allItems[i].description;
          newItem.price =
            allItems[i].amount_total / (allItems[i].quantity * 100);
          newItem.count = allItems[i].quantity;

          cartItems.push(newItem);
        }

        const userAddress = session.shipping.address;

        const dbReadyData = {};
        dbReadyData.products = cartItems;
        dbReadyData.transactionId = session.id;
        dbReadyData.amount = session.amount_total / 100;
        dbReadyData.address = [
          userAddress.line1,
          userAddress.line2,
          userAddress.city,
          userAddress.postal_code,
          userAddress.state,
          userAddress.country,
        ].join(", ");
        dbReadyData.user = userId;
        dbReadyData.updated = new Date();

        createOrder(dbReadyData)
          .then((data) => {
            if (data.hasOwnProperty("error")) {
              console.error(
                "ORDER NOT SAVED IN DB, Make sure all the details are passed"
              );
              fs.appendFileSync(
                path.join(__dirname, "orderSaveErrors.txt"),
                "ORDER NOT SAVED IN DB, Make sure all the details are passed .... " +
                  JSON.stringify(dbReadyData) +
                  "\n"
              );
              return;
            }

            dbReadyData.order = data._id;
            pushOrderIntoPurchases(
              dbReadyData.products,
              dbReadyData.transactionId,
              dbReadyData.user,
              dbReadyData.amount,
              dbReadyData.order
            );
          })
          .catch((err) => {
            console.error(
              "ORDER NOT SAVED IN DB, please see the 'orderSaveErrors.txt' for the order info"
            );
            console.error(`ERROR \n${err}`);
          });
      }
    }
  );
};

module.exports = {
  accessWebHook,
};

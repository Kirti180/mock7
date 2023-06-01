const mongoose = require("mongoose");
orderSchema = mongoose.Schema({
  user: {
    type: String,
    ref: "User",
  },
  restaurant: {
    type: String,
    ref: "Restaurant",
  },
  items: [
    {
      name: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
  },
  address: {
    street: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    zip: {
      type: String,
      require: true,
    },
  },
  status: {
    type: String,
    default: "placed",
    require: true,
    enum: ["placed", "preparing", "on the way", "delivered"],
  },
});
orderModel = mongoose.model("order", orderSchema);
module.exports = { orderModel };

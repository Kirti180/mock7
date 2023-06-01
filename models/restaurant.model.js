const mongoose = require("mongoose");
RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
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
  menu: [
    {
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      image: {
        type: String,
      },
    },
  ],
});
RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
module.exports = { RestaurantModel };

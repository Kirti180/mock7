const express = require("express");
const restRouter = express.Router();
const { RestaurantModel } = require("../models/restaurant.model");
restRouter.use(express.json());

// add resturant

restRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const info = new RestaurantModel(payload);
    await info.save();
    res.send({ msg: "created" });
  } catch (err) {
    console.log(err);
  }
});

// get resturant

restRouter.get("/restaurants", async (req, res) => {
  const info = await RestaurantModel.find(req.query);
  res.send({ msg: "got restaurants", data: info });
});

// get resturant by ID

restRouter.get("/restaurants/:id", async (req, res) => {
  const Id = req.params.id;
  const info = await RestaurantModel.findById({ _id: Id });
  res.send({ msg: "got restaurants", data: info });
});

// This endpoint should return the menu of a specific restaurant identified by its ID.

restRouter.get("/restaurants/:id/menu", async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.json(restaurant.menu);
  } catch (error) {
    console.error("Error retrieving menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// adding new itme in menu

restRouter.post("/restaurants/:id/menu", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let data = await RestaurantModel.findById(id);
    data.menu.push(req.body);
    await data.save();
    res.status(201).send("item added in restaurant" + data.name);
  } catch (error) {
    res.status(400).send("error adding new itmes restaurant");
  }
});

// delete request

restRouter.delete("/restaurants/:id/menu/:did", async (req, res) => {
  let restaurantId = req.params.id;
  let dishesId = req.params.did;
  try {
    let data = await RestaurantModel.findById(restaurantId);
    let menu = data.menu;
    let newmenu = menu.filter(
      (ele) =>
        ele._id !==
        `new
        ObjectId("${dishesId}")`
    );
    console.log(newmenu);
    data.menu = newmenu;
    await data.save();
    res.status(201).send("item deleted in restaurant" + data.name);
  } catch (error) {
    res.status(400).send(error.message);
  }
  console.log(restaurantId, dishesId);
});
module.exports = { restRouter };

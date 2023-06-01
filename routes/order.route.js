const express = require("express");
const orderRouter = express.Router();
const { orderModel } = require("../models/order.model");
orderRouter.use(express.json());
// place order
orderRouter.post("/orders", async (req, res) => {
  const payload = req.body;
  try {
    const info = new orderModel(payload);
    await info.save();
    res.send({ msg: "created" });
  } catch (err) {
    console.log(err);
  }
});
// get orderbyID
orderRouter.get("/orders/:id", async (req, res) => {
  try {
    let data = await orderModel.findById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// patch request by id
orderRouter.patch("/orders/:id", async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("order updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { orderRouter };

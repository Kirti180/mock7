const express = require("express");
const { connection } = require("./db");
const { restRouter } = require("./routes/resturant.route");
const { userRouter } = require("./routes/user.route");
const { orderRouter } = require("./routes/order.route");
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.use(auth);
app.use("/api", restRouter);
app.use("/api", orderRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
});

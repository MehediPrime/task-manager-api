const express = require("express");
const mongoose = require("mongoose");
const verifyRole = require("./middleware/verifyRole");
const app = express();

const authRoute = require("./routes/authRoutes");
const UserModel = require("./models/User");

//Auth Router
app.use("/api/auth", authRoute);

// //Common Router
// app.use("/api/common", authRoute);

// //Supervisor Router
// app.use("/api/supervisor", authRoute);

// //Memeber Router
// app.use("/api/member", authRoute);

// app.get("/", verifyRole("user"), (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", async (req, res) => {
  const user = await UserModel.find();
  // const newUser = new UserModel({
  //   name: "TEST",
  //   designation: "TEST",
  //   email: "TEST",
  //   role: "TEST",
  //   password: "TEST",
  // });

  console.log(user);
  // await newUser.save();
  res.json(user);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running at port ${process.env.SERVER_PORT}. Do not disturb!!`
  );
});

const dbConnection = async () => {
  await mongoose.connect(process.env.MONGODB_SERVER);
};
dbConnection()
  .then(() => {
    console.log("DB connection successfully established");
  })
  .catch((err) => console.log(err));

const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const executorRoutes = require("./routes/executorRoutes");

//For authorization verification from middleware
const { verifyRole } = require("./middleware/verifyRole");
const { verifyToken } = require("./middleware/verifyToken");

// //since it has not been call anywhere
// require("./models/Role");

const app = express();
app.use(express.json());

//Auth Router
app.use("/api/auth", authRoute);

// //Common Router
// app.use("/api/common", authRoute);

//Admin Router
app.use("/api/admin", verifyToken(), verifyRole(["Admin"]), adminRoutes);

//Supervisor Router
app.use(
  "/api/supervisor",
  verifyToken(),
  verifyRole(["Supervisor", "Admin"]),
  supervisorRoutes
);

//Executor Router
app.use(
  "/api/executor",
  verifyToken(),
  verifyRole(["Executor", "Supervisor", "Admin"]),
  executorRoutes
);

// //Memeber Router
// app.use("/api/member", authRoute);

app.get("/", async (req, res) => {
  res.send("Where did you get this address? 🤔");
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

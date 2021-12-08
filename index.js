const express = require("express");
require("dotenv").config();
var cors = require("cors");
require("./src/models/db");
const adminRouter = require("./src/routes/admin");
const userRouter = require("./src/routes/user");
const app = express();
let port = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(adminRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Ali Hassan (FA17-BCS-020)</h1>");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

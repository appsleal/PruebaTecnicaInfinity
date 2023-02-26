const express = require("express");
const router = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();
var bodyParser = require('body-parser')

const app = express();

require("./database");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(userRoutes);
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`);
});

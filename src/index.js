const express = require("express");
const router = require("./routes/index.routes");

const app = express();

require('./database')
app.use(router);
app.listen(3550);;
console.log('Server on port 3550');
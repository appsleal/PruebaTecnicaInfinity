const moongose = require("mongoose");

moongose
  .connect("mongodb://mongo/proyecto")
  .then((db) => console.log("Db is connected to", db.connection.host))
  .catch((err) => console.log(err));

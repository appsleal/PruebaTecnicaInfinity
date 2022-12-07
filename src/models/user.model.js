const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  first_name: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  last_name: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  date_birth: {
    type: Date,
  },
  address: {
    type: String,
    require: true,
    max: 100,
  },
  token: {
    type: String,
    require: false,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    max: 120,
  },
  mobile_phone: {
    type: String,
    require: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 254,
  },
});

module.exports = mongoose.model('User', UserModelSchema)


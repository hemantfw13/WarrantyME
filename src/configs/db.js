const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://hemant:hemant002@cluster0.av6nc.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = connect;

// Crest@123
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nik:crest123@cluster0.6naxo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected succesfully");
  });

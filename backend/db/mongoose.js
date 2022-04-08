const mongoose = require("mongoose");

const connectDB = () => {
  try{
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex : true,
      // useUnifiedTopology : true,
    });
    console.log("MongoDB connection successfull!")
  }catch(err){
    console.log("Error while connecting to MongoDB",err.message)
    process.exit();
  }
}

module.exports = connectDB

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   //useCreateIndex : true
// });

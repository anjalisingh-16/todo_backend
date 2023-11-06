const mongoose=require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL,{
    
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
);
mongoose.connection.on("error", (err) => {
  console.log("Connection failed");
});
mongoose.connection.on("connected", (connected) => {
  console.log("Connected with database");
});


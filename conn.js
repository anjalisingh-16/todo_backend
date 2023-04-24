const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://anjali:anjali@cluster0.9s6vs2b.mongodb.net/Todo?retryWrites=true&w=majority",{
    
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


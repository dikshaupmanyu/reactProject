const mongoose = require("mongoose");

// const DB = process.env.DATABASE
const DB = "mongodb+srv://yash:12345@cluster0.wpwahzr.mongodb.net/mernstack?retryWrites=true&w=majority"
// const DB = "mongodb://localhost:27017/react";
mongoose.connect(DB,{
}).then(()=>console.log("DATABASE connected")).catch((err)=> console.log("error" + err.message))
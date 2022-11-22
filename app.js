require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const path = require("path");


const port = process.env.PORT || 8005;

// const NODE_ENV = production

////////         deployment

const __dirname1 =  path.resolve();
// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "/client/build")));

//     app.get('*', (req,res) => {
//         res.sendFile(path.resolve(__dirname1,"client", "build" , "index.html"));
//     } )
// }

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1 + "/client/build/index.html"));
    });
   }

app.use(express.json());
app.use(cors())
app.use(router);

app.use("/uploads",express.static("./uploads"));


app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
})
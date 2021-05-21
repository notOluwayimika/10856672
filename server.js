import express from 'express'
import mongoose from 'mongoose'
import shopRoutes from "./routes/shopRoutes/shopRoutes.js"
import userRoutes from "./routes/userRoutes/userRoutes.js"
const router = express.Router()
import Cors from 'cors'
app.use(Cors());
//app config
const app = express();
app.use(express.json());

const port = process.env.PORT || 8001;
const connection_url=`mongodb+srv://Yimika:Nigeria2021@projects.i8x1w.mongodb.net/EcommerceProject?retryWrites=true&w=majority`

app.use(express.static("public"));

app.use("/shop", shopRoutes)
app.use("/user", userRoutes)

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).catch(error => console.log(error.reason));

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB database connected successfully")
});

//APi endpoints
app.get("/",(req,res) =>{
    res.status(200).send("hello there")
})

//Listeners
app.listen(port, ()=> console.log(`listening on local host: ${port}`));
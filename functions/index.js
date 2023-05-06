const express= require("express");
const mongoose= require("mongoose");
const dotenv = require("dotenv");
const authRouter= require("./routes/auth");
const adminRouter= require("./routes/admin");
const productRouter= require("./routes/product");
const userRouter= require("./routes/user");
const serverless= require("serverless-http");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/api`, router);

dotenv.config();

const PORT= process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB");
}).catch((e)=>{
    console.log(e)
});

app.use(express.json());
app.use(authRouter); 
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

app.get("/")


app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected to ${PORT}`)
});

module.exports= app
module.exports.handler = serverless(app);
const express= require("express");
const mongoose= require("mongoose");
const dotenv = require("dotenv");
const authRouter= require("./routes/auth");
const adminRouter= require("./routes/admin");
const productRouter= require("./routes/product");
const userRouter= require("./routes/user");

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


app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected to ${PORT}`)
});
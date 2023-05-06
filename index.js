const express= require("express");
const mongoose= require("mongoose");

const authRouter= require("./routes/auth");
const adminRouter= require("./routes/admin");
const productRouter= require("./routes/product");
const userRouter= require("./routes/user");

const PORT= 3000;
const DB = "mongodb+srv://sekhgmainuddin:Feudam123@cluster0.x5dsqcy.mongodb.net/?retryWrites=true&w=majority";

const app = express();

mongoose.connect(DB).then(()=>{
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
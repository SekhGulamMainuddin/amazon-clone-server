const mongoose = require("mongoose");
const {productSchema} = require("./product");

const userSchema= mongoose.Schema({
    name : {
        required: true,
        type: String,
        trim: true,
    },
    email : {
        required: true,
        type: String,
        validate:{
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Enter a valid email",
        }
    },
    password : {
        required: true,
        type: String,
        validate: {
            validator : (value) => {
                return value.length>=8;
            },
            message: "Enter a password of length atleast 8",
        }
    },
    address : {
        type: String,
        default: "",
    },
    type : {
        type: String,
        default: "user",
    },
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
});

const User= mongoose.model("User", userSchema);

module.exports= User;

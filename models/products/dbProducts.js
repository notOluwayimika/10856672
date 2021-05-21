import mongoose from "mongoose"

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default:0
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required : true
    },
    productType:{
        type: String,
        required: false
    },
    numReviews:{
        type: Number,
        required: false,
        default:0
    },productRating:{
        type: Number,
        default:0,
        required: false
    },countInStock:{
        type: Number,
        required: false,
        default:0
    },description:{
        type: String,
        required: false
    },
    timesPurchased:{
        type: Number,
        required:false
    }
}, {
    timestamps: true
})

export default mongoose.model('Shop', shopSchema)
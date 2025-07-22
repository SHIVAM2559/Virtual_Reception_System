import mongoose from "mongoose";

const guestSchema=new mongoose.Schema({
    name:{ 
         type: String,
         required: true,   
    },
    mobile_No:{
        type:Number,
        required:true,
    },
    adhar:{
        type:String,
        required:true,
        unique:true,
    },
    purpose: [String],
    valid_from:[Date],
    valid_to:[Date],
    Father_name:String,
    address: String,
    gender:String,
    company:String,
    division:String,
    visiting_officer:[String]

})

const Guest=mongoose.models.guest || mongoose.model("guest" , guestSchema);

export default Guest;
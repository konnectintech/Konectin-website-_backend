const mongoose = require("mongoose");
const internSubscriptionSchema = new mongoose.Schema(
    {
        userId: mongoose.Schema.Types.ObjectId,
        basicDetails:{
            fullName:String,
            email:String,
            country_code:String,
            phone_number:String,
            country:String,
            gender:String,
            ageRange:String
        },
        upload:{
            portfolio:String,
            resumes:[
                {
                    type:String
                }
            ]
        },
        education:{
            name:String,
            options:{
                type:mongoose.Schema.Types.Mixed
            }
        },
        internType:{
            type:{
                type:String
            },
            field:String
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("InternSubscription", internSubscriptionSchema);
import mongoose , {Schema , Model} from "mongoose";

interface userType {
    firstName : string,
    lastName : string,
    email : string,
    password : string
}

const userSchema: Schema<userType> = new Schema<userType>({
    firstName : {
        type : String,
        trim : true,
        required : true
    },
    lastName : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
     password : {
        type : String,
        required : true,
        minLength: 6
    }
})

export const userModel : Model<userType> = mongoose.model("users" , userSchema);
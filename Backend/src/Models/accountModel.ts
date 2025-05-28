import mongoose , {Schema , ObjectId , Model} from "mongoose";
const ObjectId = Schema.ObjectId

interface accountType {
    userId : mongoose.Types.ObjectId;
    balance : number;
}

const accountSchema : Schema<accountType> = new Schema<accountType>({
    userId : {
        type : ObjectId,
        required : true
    },
    balance : {
        type : Number,
        required : true,
        min : 0,
    }
})

export const accountModel : Model<accountType>  = mongoose.model('Account' , accountSchema)
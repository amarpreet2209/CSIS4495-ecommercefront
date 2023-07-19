import mongoose, {model, models, Schema} from "mongoose";

const AddressSchema = new Schema({
    user: mongoose.Types.ObjectId,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
});

const Address = models?.Address || model('Address'||AddressSchema)

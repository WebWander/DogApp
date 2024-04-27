// eslint-disable-next-line no-unused-vars
import mongoose, { mongo } from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted._v;
  },
});

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 nick: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },  
  present: {
    type: Boolean,
  },  
  friends: {
    type: Array,
    required: false,
    
  },
});

export default mongoose.model("Dog", dogSchema);
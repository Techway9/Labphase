// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true},
//     image: { type: String, required: true },
//     category:{ type:String, required:true}
// })

// const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
// export default foodModel;

import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, trim: true }
}, { timestamps: true });

// ✅ Explicitly specify collection name
const Food = mongoose.models.Food || mongoose.model("Food", foodSchema, "food");

export default Food;

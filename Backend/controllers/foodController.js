// import foodModel from "../models/foodModel.js";
// import fs from 'fs'

// // all food list
// const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({})
//         res.json({ success: true, data: foods })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }

// }

// // add food
// const addFood = async (req, res) => {

//     try {
//         let image_filename = `${req.file.filename}`

//         const food = new foodModel({
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             category:req.body.category,
//             image: image_filename,
//         })

//         await food.save();
//         res.json({ success: true, message: "Food Added" })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// // delete food
// const removeFood = async (req, res) => {
//     try {

//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`, () => { })

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({ success: true, message: "Food Removed" })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }

// }

// export { listFood, addFood, removeFood }

import foodModel from "../models/foodModel.js";
import fs from 'fs';

// ✅ GET: List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Error fetching food list", error: error.message });
    }
};

// ✅ POST: Add a new food item
const addFood = async (req, res) => {
    try {
        console.log("Received Body:", req.body);
        console.log("Received File:", req.file);

        // ✅ Check if required fields exist
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Ensure image is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // ✅ Create food entry
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
        });

        // ✅ Save to DB
        await food.save();
        res.status(201).json({ success: true, message: "Food Added", data: food });

    } catch (error) {
        console.error("Error in addFood:", error);
        res.status(500).json({ success: false, message: "Error adding food", error: error.message });
    }
};

// ✅ POST: Remove a food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // ✅ Check if food exists
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // ✅ Remove the image file
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        }

        // ✅ Delete from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.error("Error in removeFood:", error);
        res.status(500).json({ success: false, message: "Error removing food", error: error.message });
    }
};

export { listFood, addFood, removeFood };

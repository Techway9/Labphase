// import mongoose from "mongoose";

// export const  connectDB = async () =>{

//     await mongoose.connect('mongodb+srv://Techway29:Omoyele2907@cluster0.p5hxo.mongodb.net//food-del').then(()=>console.log("DB Connected"));
   
// }

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Techway29:Omoyele2907@cluster0.p5hxo.mongodb.net/food-del');
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};



// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
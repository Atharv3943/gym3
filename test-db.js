const mongoose = require("mongoose");

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ SUCCESS! Successfully connected to MongoDB.");
        process.exit(0);
    } catch (error) {
        console.error("❌ ERROR! Failed to connect to MongoDB.");
        console.error(error.message);
        process.exit(1);
    }
}

testConnection();

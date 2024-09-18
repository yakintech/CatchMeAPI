//mongodb+srv://bilginc_user:MAeJxxNPxj2Izfgq@cluster0.jcus0vv.mongodb.net/yesim-tech-api-db

const { default: mongoose } = require("mongoose");



const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://bilginc_user:MAeJxxNPxj2Izfgq@cluster0.jcus0vv.mongodb.net/catchme-db");

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    connectDB
};
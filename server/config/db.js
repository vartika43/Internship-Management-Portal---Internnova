const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected → ${host}/${name}`);
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

import mongoose from "mongoose";

const connectToDB = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGOOS_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected successfully-------------------------------------------->");
  } catch (e) {
    console.error("DB Initial Connection error", e);
    throw e;
  }
};

export default connectToDB;

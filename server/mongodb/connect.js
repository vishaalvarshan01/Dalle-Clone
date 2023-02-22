import mongoose from "mongoose";

const connectDb = (url) => {
  // useful for search functionality
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));
};

export default connectDb;

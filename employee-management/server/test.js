const mongoose = require("mongoose");

const uri = "mongodb+srv://nishantpatel5754_db_user:T9uDjBoOQLoS77uq@cluster0.cmbf63k.mongodb.net/?appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
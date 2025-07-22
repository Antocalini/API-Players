import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB Atlas esta conectada");
  } catch (err) {
    console.error("Error de conexión a la base de datos:", err.message);
    process.exit(1);
  }
};

const getDB = () => {
  return mongoose.connection;
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose error de conexión: ${err}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose conexión cerrada");
  process.exit(0);
});

export { connectDB, getDB };

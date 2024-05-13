import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please Add DB Url");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promis = mongoose
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log("DB Connected");
        return mongoose;
      })
      .catch((error) => {
        console.log("DB Connect Error", error);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

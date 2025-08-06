import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URL!;

if (!mongodbUri) {
  throw new Error("Please provide a MongoDB URI");
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any; promise: Promise<any> | null } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  console.log("Connecting to MongoDB...");
  if (cached?.conn) {
    // console.log("====================================");
    // console.log(cached);
    // console.log("====================================");
    return cached.conn;
  }

  if (!cached?.promise) {
    // console.log("====================================");
    // console.log("Not Promised!");
    // console.log("====================================");
    const opts = {
      bufferCommands: true,
    };

    cached!.promise = mongoose
      .connect(mongodbUri, opts)
      .then((mongoose) => mongoose.connection);
  }

  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    cached!.promise = null;
    throw new Error(`Error connecting to database ${error}`);
  }
}

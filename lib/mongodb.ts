import mongoose from "mongoose";
// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Exten the global object to include mongoose cache
declare global {
  var mongooseCache: MongooseCache;
}

const MONGODB_URI = process.env.MONGODB_URI;

// // Validate MongoDB URI exists
// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
// }

// Initialize the cache on the global object to persist across hot reloads in development
const mongooseCache: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = mongooseCache;
}

// Establishes a connection to MongoDB using Mongoose.
// Caches the connection to avoid multiple connections during development hot reloads.
// returns Promise resolving to the Mongoose insance.
async function dbConnect(): Promise<typeof mongoose> {
  // If a connection already exists, return it
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  // If a connection promise is in progress, await it
  if (!mongooseCache.promise) {
    // Validate MongoDB URI exists
    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    const options = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Create a new connection promise
    mongooseCache.promise = mongoose.connect(MONGODB_URI!, options).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Wait for the connection to establish
    mongooseCache.conn = await mongooseCache.promise;
  } catch (error) {
    mongooseCache.promise = null; // Reset the promise on failure
    throw error;
  }

  return mongooseCache.conn!;
}

export default dbConnect;

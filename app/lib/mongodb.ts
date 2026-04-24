import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error("Please define DATABASE_URL in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URL, {
      dbName: "fenmo_expense_tracker",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
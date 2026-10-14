import mongoose from "mongoose";

let connectionPromise;

export const db = async () => {
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("database connected");
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  await connectionPromise;
};

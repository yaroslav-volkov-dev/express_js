import mongoose from "mongoose";

export const connectToMongoDB = () => {
  mongoose.connect(`mongodb+srv://yaroslav:${process.env.MONGO_PASSWORD}@cluster0.tmycd.mongodb.net/shopping_list?retryWrites=true&w=majority`)
  mongoose.connection.on('connected', () => console.log('Connected'));
  mongoose.connection.on('error', (err) => console.log(`Connection failed with - ${err}`));
}
import mongoose from "mongoose";

// Define the schema for the favorite recipe
const favoriteSchema = new mongoose.Schema({
  recipeId: String,
  recipeName: String,
  imageUrl: String,
});

// Create a model based on the schema
const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

// Function to connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

// API route handler
export default async function handler(req, res) {
  await connectDB();

  // Handle GET, POST, and DELETE requests
  if (req.method === "GET") {
    const favorites = await Favorite.find({});  // Fetch all saved favorites
    res.json(favorites);  // Return the list of favorites
  } else if (req.method === "POST") {
    const { recipeId, recipeName, imageUrl } = req.body;  // Get the recipe data from the body
    const favorite = new Favorite({ recipeId, recipeName, imageUrl });
    await favorite.save();  // Save the favorite to the database
    res.json(favorite);  // Return the saved favorite
  } else if (req.method === "DELETE") {
    const { id } = req.query;  // Get the favorite's ID to delete
    await Favorite.findByIdAndDelete(id);  // Delete the favorite by ID
    res.status(204).end();  // No content returned after deletion
  }
}

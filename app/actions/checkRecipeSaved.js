"use server";
import connectDB from "@/config/database";
import User from "@/models/User";

const checkRecipeSaved = async (recipeId, userId) =>{
    await connectDB();

    const user = await User.findById(userId);

    const isSaved = user.savedRecipes.includes(recipeId);

    return { isSaved }

}

export default checkRecipeSaved;
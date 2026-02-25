"use server";
import User from "@/models/User";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";

const bookmarkRecipe = async (recipeId, userId) =>{
    console.log(recipeId, userId);
    await connectDB();

    const user = await User.findById(userId);

    //Check if bookmarked recipe exists
    const isSaved =  user.savedRecipes.includes(recipeId);

    if(isSaved){
        //Recipe needs to be removed
        user.savedRecipes.pull(recipeId);
    }
    else {
        //Recipe needs to be added to bookmarks
        user.savedRecipes.push(recipeId);
    }

    try {
        await user.save();
    } catch (error) {
        throw new Error(error);
    }
    revalidatePath('/cookbook', 'page');
}

export default bookmarkRecipe;

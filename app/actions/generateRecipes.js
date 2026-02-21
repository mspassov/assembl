"use server";
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import {v4 as uuidv4} from 'uuid';

const generateRecipes = async (ingredients, session) =>{
    const ingredientsString = ingredients.join(", ");
    const id = uuidv4();
    await connectDB();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: "system",
                    content: "You are an expert chef, tasked with generating recipes"
                },
                {
                    role: "user",
                    content: `
                    I will give you a list of ingredients, generate a recipe and return it in JSON format. Only use the JSON structure, and don't return anything else.
                    Ingredients: ${ingredientsString}

                    Output structure: { allIngredients: [], recipeTitle: string, instructions:[] cookTime: integer, description: string, difficulty: string enum(Easy, Medium, Hard) }

                    The allIngredients should be all of the ingredients necessary for the recipe.

                    The recipeTitle should be the title of the recipe.

                    The instructions should be the steps necessary to complete the recipe, added to an array. Do not number the steps, simply add the step to the array.

                    The cookTime is how long the recipe should take, in minutes.

                    The description is a quick description of the recipe.

                    The difficulty is how difficult the recipe is. It is an enum and can only take values: Easy, Medium, and Hard.

                    You may add additional ingredients, such as spices, and pantry staples, but ensure the listed ingredients are used.
                    `
                }
            ],
            model: "openai/gpt-oss-20b"
        })
    });

    const result = await res.json();
    const recipeStr = result.choices[0].message.content;
    let recipeObj = JSON.parse(recipeStr);
    //let recipeObj = JSON.parse(`{"allIngredients": [ "chicken breast", "broccoli florets", "penne pasta", "olive oil", "garlic cloves", "onion", "heavy cream", "parmesan cheese", "chicken broth", "salt", "black pepper", "red pepper flakes (optional)" ], "recipeTitle": "Creamy Pasta and Chicken", "instructions": [ "Cut the chicken breast into bite‑size pieces and season with salt and pepper.", "Heat olive oil in a large skillet over medium heat and sauté the chicken until golden and cooked through, then set aside.", "In the same skillet, add chopped onion and minced garlic; cook until fragrant and translucent.", "Add the broccoli florets and sauté for 3–4 minutes until they start to soften.", "Stir in the chicken broth and bring to a simmer, then add the uncooked penne pasta.", "Cook, stirring occasionally, until the pasta is al dente and most of the liquid is absorbed, about 10–12 minutes.", "Reduce heat to low and pour in the heavy cream, stirring to combine.", "Add the cooked chicken back to the pan, then sprinkle with grated Parmesan cheese and red pepper flakes if using.", "Season with additional salt and black pepper to taste, and let the sauce thicken for another 2 minutes.", "Serve hot, garnished with extra Parmesan if desired." ], "cookTime": 35, "description": "A quick, one‑pan creamy pasta dish featuring tender chicken, crisp broccoli, and a rich Parmesan sauce.", "difficulty": "Hard" }`)
    const title = recipeObj.recipeTitle.split(" ").join("+");

    const imgRes = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&query=${title}`, {
        method: "GET",
        headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
    });

    const imgResult = await imgRes.json();
    const imgURL = imgResult.results[0].urls.raw;
    recipeObj = {...recipeObj, imgURL, id};

    if(session){
        const newRecipe = new Recipe({
            author: session.user.id,
            recipeTitle: recipeObj.recipeTitle,
            description: recipeObj.description,
            cookTime: recipeObj.cookTime,
            allIngredients: recipeObj.allIngredients,
            instructions: recipeObj.instructions,
            difficulty: recipeObj.difficulty,
            imgURL
        })
        await newRecipe.save();
    }

    return recipeObj;
}

export default generateRecipes;
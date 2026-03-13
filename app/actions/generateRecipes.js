"use server";
import connectDB from '@/config/database';
import Recipe from '@/models/Recipe';
import {v4 as uuidv4} from 'uuid';

const generateRecipes = async (ingredients, cuisine, difficulty, session) =>{
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
                    I will give you a list of ingredients, generate a recipe and return it in JSON format.
                    Ingredients: ${ingredientsString}.

                    The recipe cuisine should be: ${cuisine}.
                    The difficulty should be: ${difficulty}.

                    The allIngredients should be all of the ingredients necessary for the recipe.

                    The recipeTitle should be the title of the recipe.

                    The instructions should be the steps necessary to complete the recipe, added to an array. Do not number the steps, simply add the step to the array.

                    The cookTime is how long the recipe should take, in minutes.

                    The description is a quick description of the recipe.

                    The difficulty is how difficult the recipe is. It is an enum and can only take values: Easy, Medium, and Hard.

                    The calories should be the number of calories per serving. 

                    You may add additional ingredients, such as spices, and pantry staples, but ensure the listed ingredients are used.
                    `
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "recipe",
                    strict: true,
                    schema:{
                        type: "object",
                        properties: {
                            allIngredients: {
                                type: "array",
                                items: {type: "string"}
                            },
                            recipeTitle: {type: "string"},
                            instructions: {
                                type: "array",
                                items: {type: "string"}
                            },
                            cookTime: {type: "number"},
                            description: {type: "string"},
                            difficulty: {
                                type: "string",
                                enum: ["Easy", "Medium", "Hard"]
                            },
                            calories: {type: "number"}
                        },
                        required: ["allIngredients", "recipeTitle", "instructions", "cookTime", "description", "difficulty", "calories"  ],
                        additionalProperties: false
                    }
                }
            },  
            model: "openai/gpt-oss-20b"
        })
    });

    const result = await res.json();
    const recipeStr = result.choices[0].message.content;
    let recipeObj = JSON.parse(recipeStr);
    const title = recipeObj.recipeTitle.split(" ").join("+");

    const imgRes = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&query=${title}`, {
        method: "GET",
        headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
    });

    const imgResult = await imgRes.json();
    const imgURL = imgResult.results[0]?.urls.raw; //Add fallback if no URL
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
            calories: recipeObj.calories,
            imgURL
        })
        await newRecipe.save();
    }

    return recipeObj;
}

export default generateRecipes;
import {Schema, model, models} from 'mongoose';

const RecipeSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeTitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cookTime: {
        type: Number,
        require: true
    },
    allIngredients: [
        {
            type: String
        }
    ],
    instructions: [
        {
            type: String
        }
    ],
    difficulty: {
        type: String
    },
    imgURL: {
        type: String
    },
}, {
    timestamps: true
})

const Recipe = models.Recipe || model("Recipe", RecipeSchema);
export default Recipe;
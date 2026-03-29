# Assembl AI
### An AI Powered Cooking Recipe App
Assembl allows you to input all of the ingredients you currently have on-hand, and then offers you detailed recipes. No more browsing the web for ideas, or endlessly searching ingredient combinations.

Try it here: https://assembl-ai.vercel.app/

**Key Features:**
- Recipes are saved to local storage, if you don't want to log in
- Advanced AI model (using OpenAI) analyzes your ingredients, and proposes recipes, with included calories, prep time, and difficulty level
- Filtering options to fine-tune the exact recipe you're looking for
- Authentication using Google, to save and browse community recipes

**Tech Stack:**
- NextJS with vanilla CSS for styling
- Grok AI for the LLM API connection (underlying model is OpenAI)
- Unsplash API for the recipe image
- Google OAuth authentication
- Deployed to Vercel

**Key Limitations:**
  - As part of the project, the recipe image is also included. Users may find that it is inaccurate, and this is because it is pulled form Unsplash, rather than being AI generated. There is currnetly no sufficeint image API for quickly generating AI images on the fly (latency is upwards of 30 seconds).

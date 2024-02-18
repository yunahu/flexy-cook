# Recipe Web Application Project

## Project Overview:
   This project is a recipe web application that provide multiple features to the customer who have various requirements on cooking and recipe searching.

#### Features of this web application includes:
- Commonly used searching options:
   - Search By Recipe Name
   - Search By Ingredients
   - Search By Nutrients
- Get Recommended Recipes
- Built-in checklist for each recipe’s cooking steps
- General-used todo list options:
   - Shopping list
   - Customized recipe
   - Short Memo
- Mini-tools (scale-converting calculators for temperature/weight)

#### API Used & Relevant Features:
- Spoonacular API (https://spoonacular.com/food-api)
   - All searching-relevant features
   - Random-fetching recipes
      - Daily recommended recipe
      - Recommended recipe list (refreshable by user)
         - Prompt the user for random recepies. If the user does not like any recipe on the list, a button is provided to refresh the whole list
   - Bookmark/Favorite recipie
- To-do list API (https://developer.todoist.com/guides/#developing-with-todoist)
   - Convert cooking steps to checklists (on recipe page)
   - General-purpose todo list, can be used as:
      - Shopping list
      - Memo
      - Local customized recipe records

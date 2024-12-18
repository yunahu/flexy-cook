# FlexyCook - Recipe Web Application Project
By Yuna Hu, Monica Gao, Fuka Nagata, Simran Kaur (CPSC-2350-M01, Group 4)

### Link to FlexyCook Web Application: [https://d3djat1rz51o8y.cloudfront.net](https://d3djat1rz51o8y.cloudfront.net)
### Link to FlexyCook API repository: [https://github.com/yunahu/flexy-cook-api](https://github.com/yunahu/flexy-cook-api)


## Project Overview:
   This recipe web application is to provide an easy-to-use tool for people who would like to cook and would like to explore the cuisine world.

   The two APIs: Spoonacular and Todo List APIs provide some of the most commonly expected features for foodies such as searching for recipes and one-click converting cooking steps into checklists.

   We also included one self-made simple api for better security on data transmissions.

### Features of this web application includes:
- Commonly used searching options:
   - Search By Recipe Name
   - Search By Ingredients
   - Search By Nutrients
- Get Recommended Recipes
- Built-in checklist for each recipe’s cooking steps
- Todo list options:
   - General-used todo list (Memo)
   - Converting cooking step to editable todo list
   - Adding ingredients of each recipe to shopping list
- Mini-tools (scale-converting switch on sticky tool bar)

### API Used & Relevant Features:
- [Spoonacular API](https://spoonacular.com/food-api)
   - All searching-relevant features
   - Random-fetching recipes
      - Daily recommended recipe
      - Recommended recipe list (refreshable by user)
- [To-do list API](https://developer.todoist.com/guides/#developing-with-todoist)
   - Convert cooking steps to checklists (on recipe page)
   - General-purpose todo list, can be used as:
      - Shopping list
      - Memo
      - Cooking steps todo list
- [flexy-cook-api](https://github.com/yunahu/flexy-cook-api)
   - Our self-made API used to communicate with other APIs
   - Provides extra security to FlexyCook



## Project Objectives:
- To combine the functionality of recipe-fetching API and todo list API and create an easy-to-use web application.
- To practice collaborating using Github and project management skills.
- To get a peek of step flows of real projects in the industry.
- To deeply explore the differences between Kanban and Scrum Agile models.



## Development environment setup:

### How to run the application locally
1. Clone this repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Run flexy-cook-api (Please refer to its own readme file.)

### How to run tests
Run `npm run test`



## Link To Relevant Files:
- [Milestone 2 Project Report](docs/Milestone%202%20Report%20Group4.pdf)
- [Project Demo Video](docs/FlexyCook_DemoVideo.mp4)
- [Presentation Slides (.pptx format, video-embedded)](docs/[Video%20Embeded]%20(2nd%20Milestone)%20Presentation%20Slides.pptx)
- [Presentation Slides (.pdf format)](docs/(2nd%20Milestone)%20Presentation%20Slides.pdf)

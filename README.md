# FlexyCook - Recipe Web Application Project
By Yuna Hu, Monica Gao, Fuka Nagata, Simran Kaur (CPSC-2350-M01, Group 4)

### Link to FlexyCook Web Application: [https://production.d3ajroqntq3q3i.amplifyapp.com/](https://production.d3ajroqntq3q3i.amplifyapp.com/)



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
- General-used todo list options:
   - Shopping list
   - Customized recipe
   - Short Memo
- Mini-tools (scale-converting calculators for temperature/weight)

### API Used & Relevant Features:
- [Spoonacular API](https://spoonacular.com/food-api)
   - All searching-relevant features
   - Random-fetching recipes
      - Daily recommended recipe
      - Recommended recipe list (refreshable by user)
         - Prompt the user for random recepies. If the user does not like any recipe on the list, a button is provided to refresh the whole list
   - Bookmark/Favorite recipie
- [To-do list API](https://developer.todoist.com/guides/#developing-with-todoist)
   - Convert cooking steps to checklists (on recipe page)
   - General-purpose todo list, can be used as:
      - Shopping list
      - Memo
      - Local customized recipe records
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



## AI Usage Disclosure Forms:
- Monica:
  - [AI Disclosure Form For Project Milestone 1](AI_Disclosure_Forms/P1_AI_Declaration_Monica_Gao_100354959.pdf)
  - [AI Disclosure Form For Project Milestone 2](AI_Disclosure_Forms/P2_AI_Declaration_Monica_Gao_100354959.pdf)

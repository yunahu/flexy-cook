import axios from 'axios';
import env from 'src/utils/env';

const spoonacularAPI = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes'
});

spoonacularAPI.interceptors.request.use(config => {
    config.headers['x-api-key'] = env.SPOONACULAR_CLIENT_ID;
    return config;
},
    error => Promise.reject(error)
);

spoonacularAPI.interceptors.response.use(response => response.data,
    error => Promise.reject(error)
);

export const getProjects = () => todoistAPI.get('/projects');

// {
//     query = undefined,
//     cuisine = undefined,
//     excludeCuisine = undefined,
//     diet = undefined,
//     intolerances = undefined,
//     equipment = undefined, // maybe not needed
//     includeIngredients = undefined,
//     excludeIngredients = undefined,
//     type = undefined,
//     instructionsRequired = undefined, //should be true
//     fillIngredients = undefined,
//     addRecipeInformation = undefined, // should be true
//     addRecipeNutrition = undefined, // should be true for nutrients search
//     recipeBoxId = undefined, // maybe not needed
//     maxReadyTime = undefined,
//     ignorePantry = undefined,
//     sort = undefined,
//     sortDirection = undefined,
//     minCarbs = undefined,
//     maxCarbs = undefined,
//     minProtein = undefined,
//     maxProtein = undefined,
//     minCalories = undefined,
//     maxCalories = undefined,
//     mixFat = undefined,
//     maxFat = undefined,
//     minAlcohol = undefined,
//     maxAlcohol = undefined,
//     minCaffeine = undefined,
//     maxCaffeine = undefined,
//     minCopper = undefined,
//     maxCopper = undefined,
//     minCalcium = undefined,
//     maxCalcium = undefined,
//     minCholine = undefined,
//     maxCholine = undefined,
//     minCholesterol = undefined,
//     maxCholesterol = undefined,
//     minFluoride = undefined,
//     maxFluoride = undefined,
//     minSaturatedFat = undefined,
//     maxSaturatedFat = undefined,
//     minVitaminA = undefined,
//     maxVitaminA = undefined,
//     minVitaminC = undefined,
//     maxVitaminC = undefined,
//     minVitaminD = undefined,
//     maxVitaminD = undefined,
//     minVitaminE = undefined,
//     maxVitaminE = undefined,
//     minVitaminK = undefined,
//     maxVitaminK = undefined,
//     minVitaminB1 = undefined,
//     maxVitaminB1 = undefined,
//     minVitaminB2 = undefined,
//     maxVitaminB2 = undefined,
//     minVitaminB3 = undefined,
//     maxVitaminB3 = undefined,
//     minVitaminB5 = undefined,
//     maxVitaminB5 = undefined,
//     minVitaminB6 = undefined,
//     maxVitaminB6 = undefined,
//     minVitaminB12 = undefined,
//     maxVitaminB12 = undefined,
//     minFiber = undefined,
//     maxFiber = undefined,
//     minFolate = undefined,
//     maxFolate = undefined,
//     minFolicAcid = undefined,
//     maxFolicAcid = undefined,
//     minIodine = undefined,
//     maxIodine = undefined,
//     minIron = undefined,
//     maxIron = undefined,
//     minMagnesium = undefined,
//     maxMagnesium = undefined,
//     minManganese = undefined,
//     maxManganese = undefined,
//     minPhosphorus = undefined,
//     maxPhosphorus = undefined,
//     minPotassium = undefined,
//     maxPotassium = undefined,
//     minSelenium = undefined,
//     maxSelenium = undefined,
//     minSodium = undefined,
//     maxSodium = undefined,
//     minSugar = undefined,
//     maxSugar = undefined,
//     minZinc = undefined,
//     maxZinc = undefined,
//     offset = undefined, //??
//     number = undefined,
// }
export const getRecipe = (params) => spoonacularAPI.get('/complexSearch', { params });

export const getRecipeFromID = async ({
    id = undefined,
    includeNutrition = undefined
}) => {
    if (id === undefined || includeNutrition === undefined) {
        throw new Error('getRecipeFromID: id and includeNutrition are required');
    }

    const res = spoonacularAPI.get(`/${id}/information?includeNutrition=${includeNutrition}`);
    return res;
}

export const getRandomRecipe = ({
    limitLicense = undefined,
    include_tags = undefined,
    exclude_tags = undefined,
    number = undefined
}) => spoonacularAPI.get('/random', { params });
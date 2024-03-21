import { random, rangeRight } from "lodash";
import { capitalize } from "./common";

const tags = [
    {
        key: "cuisine",
        text: () => getRandomCuisine(),
        type: "success",
    },
    {
        key: "diet",
        text: () => getRandomDiet(),
        type: "warning",
    },
    {
        key: "type",
        text: () => getRandomType(),
        type: "dark",
    },
    {
        key: "intolerance",
        text: () => `No ${getRandomIntolerance()}`,
        type: "light",
    }];

export const createRecommendationTags = (number) => {
    const recommendationTags = [];

    for (let i = 0; i < number - 1; i++) {
        const tag = tags[i % tags.length];
        recommendationTags.push(
            {
                key: tag.key,
                text: tag.text(),
                type: tag.type
            }
        )
    }

    recommendationTags.push(
        {
            key: "maxReadyTime",
            text: "Fast",
            type: "info",
        }
    )

    return recommendationTags;
}

const getRandomNotIn = (chosenList, list) => {
    let randomItem = null;
    while (randomItem === null || chosenList.indexOf(randomItem) !== -1) {
        randomItem = capitalize(list[random(list.length - 1)]);
    }

    return randomItem;
}

const chosenCuisine = [];
const getRandomCuisine = () => {
    const cuisine = [
        "African",
        "Asian",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
    ]

    const randomCuisine = getRandomNotIn(chosenCuisine, cuisine);
    chosenCuisine.push(randomCuisine);

    return randomCuisine;
}

const chosenDiet = [];
const getRandomDiet = () => {
    const diet = [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto ovo vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Whole30",
    ]

    const randomDiet = getRandomNotIn(chosenDiet, diet);

    chosenDiet.push(randomDiet);
    return randomDiet;
}

const chosenIntolerance = [];
const getRandomIntolerance = () => {
    const intolerance = [
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree Nut",
        "Wheat",
    ]

    const randomIntolerance = getRandomNotIn(chosenIntolerance, intolerance);
    chosenIntolerance.push(randomIntolerance);

    return randomIntolerance;
}

const chosenTypes = [];
const getRandomType = () => {
    const type = [
        "main course",
        "side dish",
        "dessert",
        "appetizer",
        "salad",
        "bread",
        "breakfast",
        "soup",
        "beverage",
        "sauce",
        "marinade",
        "fingerfood",
        "snack",
        "drink",
    ]

    const randomType = getRandomNotIn(chosenTypes, type);
    chosenTypes.push(randomType);

    return randomType;
}


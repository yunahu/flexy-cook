import { capitalize } from "./common";

export const findStrongestTaste = (tastes) => {
    if (tastes.bitterness == 100) {
        return "Bitter";
    } else if (tastes.fattiness == 100) {
        return "Fatty";
    } else if (tastes.saltiness == 100) {
        return "Salty";
    } else if (tastes.sourness == 100) {
        return "Sour";
    } else if (tastes.spiciness == 100) {
        return "Spicy";
    } else if (tastes.sweetness == 100) {
        return "Sweet";
    }
};

export const createTags = (recipe) => {
    const tags = [
        {
            text:
                recipe[0].cuisines.length > 0
                    ? capitalize(recipe[0].cuisines[0])
                    : null,
            type: "success",
        },
        {
            text: recipe[0].diets.length > 0 ? capitalize(recipe[0].diets[0]) : null,
            type: "warning",
        },
        {
            text:
                recipe[0].dishTypes.length > 0
                    ? capitalize(recipe[0].dishTypes[0])
                    : null,
            type: "dark",
        },
        {
            text: recipe[0].veryPopular ? "Popular" : null,
            type: "info",
        },
        {
            text: recipe[0].cheap ? "Cheap" : null,
            type: "info",
        },
        {
            text: recipe[0].veryHealthy ? "Healthy" : null,
            type: "info",
        },
        {
            text: findStrongestTaste(recipe[1]),
            type: "light",
        },
    ];
    return tags;
};

export const trimIngredients = (ingredients, length) => {
    if (ingredients?.length <= length) {
        ingredients = ingredients.map((ingredient) => ingredient.name).join(", ");
        return ingredients;
    }

    ingredients = ingredients.slice(0, length).map((ingredient) => ingredient.name)
        .join(", ");
    ingredients += "...";
    return ingredients;
};

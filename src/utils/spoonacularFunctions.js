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

export const createLocationData = (instruction, tag) => {
    const data = [
        {
            recipe: instruction,
            tags: tag,
        }
    ]
    return data;
};

export const createTags = (recipe) => {
    const tags = [
        {
            key: "cuisine",
            text:
                recipe[0]?.cuisines.length > 0
                    ? capitalize(recipe[0].cuisines[0])
                    : null,
            type: "success",
        },
        {
            key: "diet",
            text: recipe[0]?.diets.length > 0 ? capitalize(recipe[0].diets[0]) : null,
            type: "warning",
        },
        {
            key: "type",
            text:
                recipe[0]?.dishTypes.length > 0
                    ? capitalize(recipe[0].dishTypes[0])
                    : null,
            type: "dark",
        },
        {
            key: "maxReadyTime",
            text:
                recipe[0]?.maxReadyTime < 30
                    ? "Fast"
                    : null,
            type: "info",
        },
        {
            key: "maxCalories",
            text: recipe[0]?.veryPopular ? "Popular" : null,
            type: "info",
        },
        {
            text: recipe[0]?.cheap ? "Cheap" : null,
            type: "info",
        },
        {
            text: recipe[0]?.veryHealthy ? "Healthy" : null,
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

    let trimmedIngredients = ingredients?.splice(0, length).map((ingredient) => ingredient.name)
        .join(", ");
    trimmedIngredients += "...";
    return trimmedIngredients;
};

export const getTagInfo = (tag) => {
    if (tag.key === undefined || tag.text === null) {
        alert("This tag is not clickable")
        return null;
    }

    let tagInfo = [];
    if (tag?.key == "maxReadyTime") {
        tagInfo = [
            {
                key: tag.key,
                amount: 30,
            }
        ]
    } else if (tag?.key == "maxCalories") {
        tagInfo = [
            {
                key: tag.key,
                amount: 300,
            },
            {
                key: "maxSodium",
                amount: 70,
            },
            {
                key: "maxSugar",
                amount: 8,
            }
        ]
    } else if (tag.key && tag.text != null) {
        tagInfo = [
            {
                key: tag.key,
                amount: (tag.text).toLowerCase(),
            }
        ]
    }
    return tagInfo;
}


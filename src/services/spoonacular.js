export const getImage = (recipe, index) => {
    const { analyzedInstructions } = recipe;
    const steps = (analyzedInstructions[0].steps[index]);
    if (steps.equipment[0] && steps.equipment[0].image) {
        if ((steps.equipment[0].image).includes("https")) {
            return steps.equipment[0].image;
        } else {
            return `https://spoonacular.com/cdn/equipment_250x250/${steps.equipment[0].image}`;
            // 100x100 / 250x250 / 500x500
        }
    } else if (
        steps.ingredients[0] &&
        (steps.ingredients[0].image || steps.ingredients[1].image)
    ) {
        if ((steps.ingredients[0].image).includes("https")) {
            return steps.ingredients[0].image
        } else {
            return `https://spoonacular.com/cdn/ingredients_250x250/${steps.ingredients[0].image || steps.ingredients[1].image
                }`;
            // 100x100 / 250x250 / 500x500
        }
    } else {
        return recipe.image;
    }
    return "";
};
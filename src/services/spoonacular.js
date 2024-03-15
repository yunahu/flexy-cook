export const getImage = (step) => {
    if (step.equipment[0] && step.equipment[0].image) {
        return `https://spoonacular.com/cdn/equipment_250x250/${step.equipment[0].image}`;
        // 100x100 / 250x250 / 500x500
    } else if (
        step.ingredients[0] &&
        (step.ingredients[0].image || step.ingredients[1].image)
    ) {
        return `https://spoonacular.com/cdn/ingredients_250x250/${step.ingredients[0].image || step.ingredients[1].image
            }`;
        // 100x100 / 250x250 / 500x500
    } else {
        return recipe.image;
    }
};
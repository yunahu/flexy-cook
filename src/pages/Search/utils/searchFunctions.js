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

export const defineScale = (nutrient) => {
    switch (nutrient) {
        case "Carbs":
        case "Protein":
        case "Fat":
        case "Fiber":
        case "Sugar":
        case "Alcohol":
            return 'g';

        case "Iron":
        case "Sodium":
        case "Caffeine":
        case "Magnesium":
        case "Zinc":
        case "Calcium":
        case "Cholesterol":
        case "VitaminC":
        case "VitaminE":
            return 'mg';

        case "Folate":
        case "FolicAcid":
        case "VitaminB12":
            return 'μg';

        case "Calories":
            return 'kcal';
    }
}

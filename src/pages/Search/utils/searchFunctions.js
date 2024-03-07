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

export const defineScale = (Nutrient) => {
    switch (Nutrient) {
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
            return 'mg';


            return 'g';
        case "Magnesium":
            return 'mg';
        case "Folate":
            return 'μg';
        case "Zinc":
            return 'mg';
        case "FolicAcid":
            return 'μg';
        case "Calcium":
            return 'mg';
        case "Cholesterol":
            return 'mg';
        case "VitaminC":
            return 'mg';
        case "VitaminE":
            return 'mg';
        case "VitaminB12":
            return 'μg';


        case "Calories":
            return 'kcal';
    }
}

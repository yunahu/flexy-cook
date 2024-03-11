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



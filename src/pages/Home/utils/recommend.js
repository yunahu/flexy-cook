const DISLIKE_STORAGE_NAME = "dislikes";

export const getDislikes = () => {
    if (localStorage.getItem(DISLIKE_STORAGE_NAME) === null) {
        localStorage.setItem(DISLIKE_STORAGE_NAME, JSON.stringify([]));
        return [];
    }

    return JSON.parse(localStorage.getItem(DISLIKE_STORAGE_NAME));
};

export const addDislike = (id) => {
    const dislikes = getDislikes();

    if (typeof id === 'object') {
        dislikes.push(...id);
    } else {
        dislikes.push(id);
    }
    localStorage.setItem(DISLIKE_STORAGE_NAME, JSON.stringify(dislikes));
    return dislikes;
};
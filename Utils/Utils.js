export const isValidPos = (pos) => {
    let [x, y] = pos;
    return 0 <= x && x < 7 && 0 <= y && y < 8;
};

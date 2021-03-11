export function conditions(arr, fallback) {
    for (let i = 0, len = arr.length; i < len; i += 1) {
        if (arr[i][0]) {
            return arr[i][1];
        }
    }
    return fallback;
}
//# sourceMappingURL=logic.js.map
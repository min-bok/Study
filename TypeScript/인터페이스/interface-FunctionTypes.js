var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
// mySearch = function(src, sub) {
//     let result = src.search(sub);
//     return "string";
// }
// 'string' is not assignable to type 'boolean'.

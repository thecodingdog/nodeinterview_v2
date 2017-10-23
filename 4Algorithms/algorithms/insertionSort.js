/*
  A JavaScript module which performs an insertion sort on a given array of numbers, ordering the elements from lowest to highest.
*/
module.exports = exports = function (input) {
// complete the function
  for (var i = 1; i < input.length; i++) {
    var temp = input[i]
    for (var j = i - 1; j >= 0 && (input[j] > temp); j--) {
      input[j + 1] = input[j]
    }
    input[j + 1] = temp
  }
  return input
}

//   return input.sort((a, b) => {
//     if (a < b) {
//       return -1
//     } else return 1
//   })
// }

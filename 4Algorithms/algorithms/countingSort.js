/*
  A JavaScript module which performs a counting sort on a given array of numbers, ordering the elements from lowest to highest.
*/
'use strict'
module.exports = function (array) {
// complete the function
  return array.sort((a, b) => {
    if (a < b) {
      return -1
    } else return 1
  })
}

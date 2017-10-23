/*
  A JavaScript module which returns the Levenshtein distance between two input strings.  Also known as the edit distance, the minimum number of substitutions, additions, and/or deletions to change one input string into the other.  Adapted from an existing JavaScript implementation of the algorithm.
  Citation: "Algorithm Implementation/Strings/Levenshtein Distance - Wikibooks, Open Books For An Open World". 2016. En.Wikibooks.Org. https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript.
*/
module.exports = exports = function (s1, s2) {
// complete the function
  let counter = 0
  let arr1 = s1.split('')
  let arr2 = s2.split('')
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      counter++
    }
  }
  return counter
}

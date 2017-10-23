/*
  A JavaScript module which performs a Durstenfeld shuffle on a given array.
*/
module.exports = exports = function (input) {
// complete the function
  let loops = input.length
  let ansarr = []
  for (let i = 0; i < loops; i++) {
    let randNo = getRandomIntInclusive(0, input.length)
    ansarr.push(input[randNo])
    // console.log(ansarr)
    input.splice(randNo, 1)
    // console.log(input)
    return ansarr
  }

  function getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

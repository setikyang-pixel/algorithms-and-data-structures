function Buble_Sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let l = 0; l < arr.length - 1 - i; l++) {
        
      if (arr[l] >= arr[l + 1]) {
        [arr[l], arr[l + 1]] = [arr[l + 1], arr[l]]
      }
    }
  }

  return arr;
}

console.log(Buble_Sort([10,9, 8, 7, 6, 5, 4, 3, 2, 1]));

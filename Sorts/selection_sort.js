function Selection_Sort(arr) {
  if (arr.length == 1) return arr;
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_index = i;
    for (let l = i + 1; l < n; l++) {
      if (arr[min_index] > arr[l]) {
        min_index = l;
      }
    }
    [arr[min_index], arr[i]] = [arr[i], arr[min_index]];
  }
  return arr;
}

console.log(Selection_Sort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

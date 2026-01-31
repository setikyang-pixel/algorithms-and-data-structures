function Selection_Sort(arr) {
  if (arr.length == 1) return arr;
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}

console.log(Selection_Sort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

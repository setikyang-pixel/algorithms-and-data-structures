function InsertionSort(arr) {
  if (arr.length == 1) return arr;
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let j = i - 1;
    let key = arr[i];
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      --j;
    }
    arr[j + 1] = key;
  }
  return arr;
}

console.log(InsertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

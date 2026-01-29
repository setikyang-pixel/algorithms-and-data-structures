function CountingSort(arr) {
  if (arr.length == 1) return arr;
  let n = arr.length;
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < n; i++) {
    if (arr[i] >= max) max = arr[i];
    if (arr[i] <= min) min = arr[i];
  }
  let range = max - min + 1;
  let count = new Array(range).fill(0);
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
  }
  let arr2 = [];
  for (let i = 0; i < range; i++) {
    while (count[i]-- > 0) {
      arr2.push(i + min);
    }
  }
  return arr2;
}

console.log(CountingSort([222, 233, 213, 12, 112]));

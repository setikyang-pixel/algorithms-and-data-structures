function Buble_Sort(arr) {
  let n = arr.length;
  let flag;
  do {
    flag = false;
    for (let j = 0; j < n; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
  } while (flag);
  return arr;
}

console.log(Buble_Sort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

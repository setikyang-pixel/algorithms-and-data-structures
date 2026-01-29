function Comulative(arr) {
  if (arr.length == 1) return arr;
  let max = Math.max(...arr);
  let min = Math.min(...arr);
  let n = arr.length;
  let count = new Array(max - min + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1]
  }
  let arr2 = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let val = arr[i];
    let idx = val - min;
    let pos = count[idx] - 1;
    arr2[pos] = val;
    count[idx]--
  }
  return arr2
}

console.log(Comulative([56, 45, 34, 23, 12]));
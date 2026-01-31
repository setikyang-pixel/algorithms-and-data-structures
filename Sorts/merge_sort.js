function Merge(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  let Lsort = Merge(left);
  let Rsort = Merge(right);
  return (function (rus1, rus2) {
    let n1 = rus1.length;
    let n2 = rus2.length;
    let array = [];
    let i = 0;
    let j = 0;
    while (i < n1 && j < n2) {
      if (rus1[i] <= rus2[j]) {
        array.push(rus1[i++]);
      } else {
        array.push(rus2[j++]);
      }
    }
    while (i < n1) {
      array.push(rus1[i++]);
    }
    while (j < n2) {
      array.push(rus2[j++]);
    }
    return array;
  })(Lsort, Rsort);
}

console.log(Merge([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

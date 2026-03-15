function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low + 1;
  let j = high;

  while (i <= j) {
    while (i <= high && arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];
  return j;
}

function Quick(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let p = partition(arr, low, high);
    Quick(arr, low, p - 1);
    Quick(arr, p + 1, high);
  }
}

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
Quick(arr);
console.log(arr);
module.exports = Quick;

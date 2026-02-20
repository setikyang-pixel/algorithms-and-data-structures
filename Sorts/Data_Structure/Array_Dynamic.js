class DynamicArray {
  #arr;
  #size = 0;
  #capacity;
  constructor(cap = 0, fill = 0) {
    if (cap < 0) throw new Error("borderline poverty");
    this.#capacity = cap;
    this.#size = cap;
    this.fill = fill;
    this.#arr = new Int32Array(cap);
  }
  size() {
    return this.#size;
  }
  capacity() {
    return this.#capacity;
  }
  empty() {
    return this.#size == 0;
  }
  reserve(n) {
    if (n >= this.#capacity) {
      let newArr = new Int32Array(n);
      for (let i = 0; i < this.#size; i++) {
        newArr[i] = this.#arr[i];
      }
      this.#arr = newArr;
      this.#capacity = n;
      return newArr;
    }
  }
  shrinkToFit() {
    let newArr = new Int32Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.#arr[i];
    }
    this.#arr = newArr;
    this.#capacity = this.#size;
  }

  clear() {
    this.#size = 0;
  }
  at(i) {
    if (i < 0 || i >= this.#size) {
      throw new Error("i is lower number");
    }
    return this.#arr[i];
  }
  set(i, value) {
    if (i > this.#size) {
      throw new Error("Small space");
    }
    if (isNaN(value)) {
      throw new Error("Enter for number");
    }
    this.#arr[i] = value;
    return this.#arr;
  }
  front() {
    return this.at(0);
  }

  back() {
    return this.at(this.#size - 1);
  }
  toArray() {
    return [...this.#arr];
  }
  pushBack(value) {
    if (!Number.isInteger(value)) {
      throw new Error("is not number");
    }
    if (this.#size === this.#capacity) {
      this.#capacity *= 2;
      this.reserve(this.#capacity);
    }
    this.#arr[this.#size++] = value;
  }
  popBack() {
    if (this.empty()) throw new Error("Array is empty");
    this.#size--;
  }
  insert(pos, value) {
    if (pos < 0 || pos > this.#size) throw new Error("Index Enter now");
    this.reserve(2);
    for (let i = this.#size - 1; i > pos; i--) {
      this.#arr[i] = this.#arr[i - 1];
    }
    this.#arr[pos] = value;
  }

  erase(pos) {
    if (pos < 0 || pos >= this.#size) throw new Error("Enter valid argumnet");
    for (let i = pos; i < this.#size - 1; i++) {
      this.swap(i, i + 1);
    }
    this.#size--;
  }

  #resize(n) {
    let array = new Int32Array(this.#size > n ? (this.#size -= n) : n);
    array = this.#arr;
  }

  swap(i, j) {
    if (!Number.isInteger(i) || !Number.isInteger(j))
      throw new Error("Enter valid argumnet");
    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    // this.#arr[i] ^= this.#arr[j]
    // this.#arr[j] ^= this.#arr[i]
    // this.#arr[i] ^= this.#arr[j]
  }

  /* ================= Իտերացիա ================== */

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        return { done: i < this.#size ? false : true, value: this.#arr[i++] };
      },
    };
  }

  *values() {
    yield* this.#arr;
  }

  *keys() {
    for (let i = 0; i < this.#size; i++) {
      yield i;
    }
  }

  *entries() {
    for (let i = 0; i < this.#size; i++) {
      yield [i, this.#arr[i]];
    }
  }

  /* ================== Բարձր կարգ ================ */

  forEach(fn) {
    for (let i = 0; i < this.#size; i++) {
      fn(this.at(i), i, this);
    }
  }

  map(fn) {
    let array = [];
    for (let i = 0; i < this.#size; i++) {
      array[i] = fn(this.at(i), i, this);
    }
    return array;
  }

  filter(fn) {
    let array = [];
    for (let i = 0; i < this.#size; i++) {
      if (fn(this.at(i), i, this)) {
        array.push(this.at(i));
      }
    }
    return array;
  }

  reduce(fn, initial) {
    let acc = initial;
    let start = 0;
    if (acc == undefined) {
      acc = this.#arr[0];
      start = 1;
    }
    for (let i = start; i < this.#size; i++) {
      acc = fn(acc, this.at(i), i, this);
    }
    return acc;
  }

  some(fn) {
    for (let i = 0; i < this.#size; i++) {
      if (fn(this.#arr[i], i, this)) {
        return true;
      } else {
        return false;
      }
    }
  }

  every(fn) {
    for (let i = 0; i < this.#size; i++) {
      if (!fn(this.#arr[i], i, this.#arr)) {
        return false;
      }
    }
    return true;
  }

  find(fn) {
    for (let i = 0; i < this.#size; i++) {
      if (fn(this.#arr[i], i, this.#arr)) {
        return this.#arr[i];
      }
    }
  }

  findIndex(fn) {
    for (let i = 0; i < this.#size; i++) {
      if (fn(this.#arr[i], i, this.#arr)) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.#arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  /* =================== Ընդլայնումներ ================== */

  reverse() {
    for (let i = 0; i < this.#size / 2; ++i) {
      this.swap(i, this.#size - i);
    }
  }
  sort() {
    if (this.#size < 500) {
      bubbleSort(this.#arr);
    } else {
      quickSort(this.#arr);
    }
  }

  clone() {
    let copy = new DynamicArray(this.#size);
    for (let i = 0; i < this.#size; i++) {
      copy.#arr[i] = this.#arr[i];
    }
    return copy.#arr;
  }

  equals(other) {
    for (let i = 0; i < this.#size; i++) {
      if (this.#arr[i] !== other) {
        return false;
      }
    }
    return true;
  }
}

let a = new DynamicArray(7);


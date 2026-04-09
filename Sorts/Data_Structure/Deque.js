class Deque {
  #arr;
  #front;
  #size;
  constructor(capacity = 8) {
    if (capacity < 2) throw new Error("Invalid Arguments");
    this.cap = capacity;
    this.#front = 0;
    this.#size = 0;
    this.#arr = new Array(this.cap).fill(undefined);
  }

  /* ================= Basic State ================= */
  size() {
    return this.#size;
  }

  capacity() {
    return this.cap;
  }

  empty() {
    return this.#size === 0;
  }

  full() {
    return this.#size === this.cap;
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    return i % this.cap;
  }

  #index(i) {
    if (i < 0 || i >= this.#size) throw new Error("Invalid arguments");
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    if (this.#size < this.cap) return;
    if (this.#size === this.cap) {
      this.cap *= 2;
      let deqClone = new Array(this.cap).fill(undefined);
      for (let i = 0; i < this.#size; i++) {
        deqClone[i] = this.#arr[this.#index(i)];
      }
      this.#arr = deqClone;
      this.#front = 0;
    }
  }

  /* ================= Element Access ================= */

  front() {
    if (this.empty()) throw new Error("Length is a n === 0");
    return this.#arr[this.#front];
  }

  back() {
    if (this.empty()) throw new Error("Length is a n === 0");
    return this.#arr[this.#index(this.#size - 1)];
  }

  at(i) {
    if (this.empty()) throw new Error("Length is a n === 0");
    return this.#arr[this.#mod(this.#front + i)];
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    if (this.cap == this.#size) this.#ensureCapacityForOneMore();
    let idx = this.#mod(this.#front + this.#size);
    this.#arr[idx] = value;
    this.#size++;
  }

  push_front(value) {
    if (this.cap === this.#size) this.#ensureCapacityForOneMore();
    let idx = this.#mod(this.#front - 1 + this.cap);
    this.#arr[idx] = value;
    this.#size++;
  }

  pop_front() {
    if (this.empty()) throw new Error("Invalid index");
    let idx = this.#mod(this.#front + 1);
    let val = this.#arr[idx];
    this.#arr[idx] = undefined;
    this.#size--;
    return val;
  }

  pop_back() {
    if (this.empty()) throw new Error("Deque is empty");
    let idx = this.#mod(this.#front + this.#size - 1)
    let val = this.#arr[idx];
    this.#arr[idx] = undefined;
    this.#size--;
    return val;
  }

  clear() {
    this.#front = 0;
    this.#size = 0;
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if (newCapacity <= this.cap) return;
    let array = new Array(newCapacity).fill(undefined);
    for (let i = 0; i < this.#size; i++) {
      array[i] = this.at(i);
    }
    this.#arr = array;
    this.cap = newCapacity;
    this.#front = 0;
  }

  shrinkToFit() {
    if (this.cap === this.#size || this.#size === 0) return;
    let array = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      array[i] = this.at(i);
    }
    this.#arr = array;
    this.cap = this.#size;
    this.#front = 0;
  }

  rotateLeft(k = 1) {
    if (this.#size === k) return;
    k = k % this.#size;
    this.#front = this.#mod(this.#front + k);
  }

  rotateRight(k = 1) {
    if (this.#size === k) return;
    k = k % this.#size;
    this.#front = this.#mod(this.#front - k);
  }

  swap(i, j) {
    if (i < 0 || j < 0 || i >= this.#size || j >= this.#size)
      throw new Error("Invalid index");
    const a = this.#index(i);
    const b = this.#index(j);
    [this.#arr[a], this.#arr[b]] = [this.#arr[b], this.#arr[a]];
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) === value) return i;
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) === value) return true;
    }
    return false;
  }

  toArray() {
    let n = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      n[i] = this.#arr[this.#index(i)];
    }
    return n;
  }

  clone() {
    let a = new Deque(this.cap);
    for (let i = 0; i < this.#size; i++) {
      a.push_back(this.at(i));
    }
    return a;
  }

  equals(otherDeque) {
    if (otherDeque.size() != this.#size) return false;
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) != otherDeque.at(i)) return false;
    }
    return true;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let i = this.#front;
    return {
      next: () => {
        if (i != this.#size) {
          return { value: this.at(i++), done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }

  *values() {
    for (let i = 0; i < this.#size; i++) {
      yield this.at(i);
    }
  }

  *keys() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#index(i);
    }
  }

  *entries() {
    for (let i = 0; i < this.#size; i++) {
      yield [this.#index(i), this.at(i)];
    }
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    for (let i = 0; i < this.#size; i++) {
      fn(this.at(i), i, this);
    }
  }

  map(fn) {
    let res = [];
    for (let i = 0; i < this.#size; i++) {
      res.push(fn(this.at(i), i, this));
    }
    return res;
  }

  filter(fn) {
    let res = [];
    for (let i = 0; i < this.#size; i++) {
      let val = this.at(i);
      if (fn(val, i, this)) {
        res.push(val);
      }
    }
    return res;
  }

  reduce(fn, initial) {
    let acum = initial;
    let start = 0;
    if (acum == undefined) {
      acum = this.at(0);
      start = 1;
    }
    for (let i = start; i < this.#size; i++) {
      acum = fn(acum, this.at(i), i, this);
    }
    return acum;
  }
}

let deq = new Deque(5);
deq.push_back(10);
deq.push_back(20);
deq.push_back(30);
deq.push_back(40);
deq.push_back(50);

for (const i of deq) {
  console.log(i);
}

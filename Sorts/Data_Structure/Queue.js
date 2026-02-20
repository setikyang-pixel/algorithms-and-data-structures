class Queue {
  #queue;
  #front;
  #back;
  #size;
  #cap;

  constructor(capacity) {
    if (capacity < 0) throw new Error("Invalid capacity");
    this.#queue = new Array(capacity);
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
    this.#cap = capacity;
  }

  isArr() {
    return [...this.#queue];
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  is_empty() {
    return this.#size === 0;
  }

  is_full() {
    return this.#size === this.#cap;
  }

  clear() {
    if (this.is_empty()) throw new Error("Is empty array");
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
  }

  /* ================= Core Queue Operations ================= */

  enqueue(value) {
    if (this.#size === this.#cap) throw new Error("Overflow");
    this.#queue[this.#front++] = value;
    this.#size++;
  }

  dequeue() {
    if (this.is_empty()) throw new Error("Error");
    let value = this.#queue[this.#back + 1];
    this.#queue[this.#back + 1] = undefined;
    this.#back++;
    this.#size++;
    return value;
  }

  peek() {
    return this.#queue[this.#back] ? this.#queue[this.#back] : null;
  }

  back() {
    return this.#queue[this.#front] ? this.#queue[this.#front] : null;
  }

  print() {
    let arr = new Array(this.#size);
    for (let i = this.#back + 1; i < this.#size; i++) {
      arr[i] = this.#queue[i];
    }
    return arr;
  }
}

let queue = new Queue(8);

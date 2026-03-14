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
    this.#queue[++this.#back] = value;
    this.#size++;
  }

  dequeue() {
    if (this.#size === 0) throw new Error("Empty");
    let value = this.#queue[this.#front];
    this.#queue[this.#front] = undefined;
    this.#front++;
    this.#size--;
    return value;
  }

  peek() {
    return this.#size === 0 ? null : this.#queue[this.#front];
  }

  back() {
    return this.#queue[this.#front] ? this.#queue[this.#front] : null;
  }

  print() {
    let arr = [];
    for (let i = this.#front; i <= this.#back; i++) {
      arr.push(this.#queue[i]);
    }
    return arr;
  }
}

let queue = new Queue(8);
queue.enqueue(12);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(22);
queue.enqueue(32);
queue.enqueue(42);
console.log(queue.print());
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.print());

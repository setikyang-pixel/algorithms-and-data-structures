class Stack {
  #stack;
  #size;
  #cap;

  constructor(capacity) {
    if (capacity < 0) throw new Error("capacity is Invalid");
    this.#stack = new Array(capacity);
    this.#cap = capacity;
    this.#size = 0;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  is_empty() {
    return this.#size == 0;
  }

  is_full() {
    return this.#size === this.#cap;
  }

  clear() {
    while (!this.is_empty()) this.pop();
  }

  /* ================= Core Stack Operations ================= */

  push(value) {
    if (this.#size === this.#cap) throw new Error("stack is full");
    this.#stack[this.#size++] = value;
  }

  pop() {
    if (this.is_empty()) throw new Error("underflow");
    return this.#stack[--this.#size] = undefined;
  }

  peek() {
    if(this.is_empty()) throw new Error("Error");
    return this.#stack[this.#size - 1]
  }
}

let stack = new Stack(8);
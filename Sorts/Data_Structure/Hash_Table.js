class Node {
  constructor(v, key) {
    this.v = v;
    this.next = null;
    this.key = key;
  }
}

class HashTable {
  #table;
  #capacity;
  #size = 0;
  #loadFactor;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#table = new Array(capacity).fill(null);
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  isEmpty() {
    return this.#size == 0;
  }

  clear() {
    this.#size = 0;
    this.#table = Array.from(capacity, () => null);
  }

  /* ================= Hashing ================= */

  #hash(key) {
    key = String(key);
    let hash = 0;
    for (const i of str) {
      hash += i.charCodeAt();
    }
    return hash % this.#table.length;
  }

  /* ================= Core Operations ================= */

  put(key, value) {
    let index = this.#hash(key);
    let head = this.#table[index];
    let cur = head;
    while (cur) {
      if (cur.key === key) {
        cur.val = value;
        return;
      }
      cur = cur.next;
    }
    let newNode = new Node(value, key);
    newNode.next = head;
    this.#table[index] = newNode;
    this.#size++;
    if (this.#size / this.#capacity <= this.#loadFactor) {
      this.#resize(this.#capacity * 2);
    }
  }

  get(key) {
    let hash = this.#hash(key);
    let i = this.#table[hash];
    while (i) {
      if (i.key == key) {
        return i.val;
      }
      i = i.next;
    }
  }

  remove(key) {
    let cur = this.#table[this.#hash(key)];
    let prev = null;
    while (cur) {
      if (cur.key === key) {
        if (prev === null) {
          this.#table[this.#hash(key)] = cur.next;
        } else {
          prev.next = prev.next.next;
        }
        this.#size--;
        return cur.v;
      }
      prev = cur;
      cur = cur.next;
    }

    return null;
  }

  containsKey(key) {
    // Must return true if key exists
    // Otherwise false
  }

  containsValue(value) {
    // Must search entire table
    // Return true if value exists
  }

  /* ================= Resize / Rehash ================= */
  #resize(newCapacity) {
    const old = this.#table;
    this.#table = new Array(newCapacity).fill(null);
    this.#capacity = newCapacity;
    this.#size = 0;
    for (const i of old) {
      let n = i;
      while (n) {
        this.put(n.val, n.key);
        n = n.next;
      }
    }

    this.#table = new_Arr;
  }

  loadFactor() {
    // Must return current load factor:
    // size / capacity
  }

  /* ================= Entry Views ================= */

  keys() {
    // Must return array OR iterator of all keys
  }

  values() {
    // Must return array OR iterator of all values
  }

  entries() {
    // Must return array OR iterator of [key, value]
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    // Must iterate through key-value pairs
    // Each step returns [key, value]
  }

  /* ================= Utility Operations ================= */

  toObject() {
    // Must convert hash table into plain JS object
    // Keys become object properties
  }

  clone() {
    // Must create deep copy of table
    // New table must not share buckets
  }

  equals(otherTable) {
    // Must return true if:
    // both tables contain identical key-value pairs
  }

  /* ================= Debug / Visualization ================= */

  bucketSizes() {
    // Must return array showing number of elements per bucket
    // Useful for analyzing hash distribution
  }

  print() {
    // Must display hash table contents
    // Show buckets and entries
  }
}

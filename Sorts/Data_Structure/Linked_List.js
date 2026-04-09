class Node {
  #value;
  #next = null;

  constructor(val = 0) {
    this.#value = val;
  }

  get value() {
    return this.#value;
  }

  set value(val) {
    this.#value = val;
  }

  get next() {
    return this.#next;
  }

  set next(new_node) {
    if (new_node instanceof Node || new_node == null) {
      this.#next = new_node;
    } else {
      throw new Error("Error");
    }
  }
}

class SinglyLinkedList {
  #head = null;
  #size = 0;

  constructor(iterable) {
    this.#head = null;
    if (iterable == undefined) return;

    if (typeof iterable[Symbol.iterator] == "function") {
      for (const item of iterable) {
        this.push_back(item);
      }
    } else {
      this.push_back(iterable);
    }
  }

  getHead() {
    let a = this.#head;
    while (a) {
      console.log(a.value);
      a = a.next;
    }
  }

  /* ================= Size & State ================= */

  size() {
    let oneLink = this.#head;

    let count = 0;
    while (oneLink) {
      ++count;
      oneLink = oneLink.next;
    }
    return count;
  }

  isEmpty() {
    return this.#size === 0 ? true : false;
  }

  clear() {
    this.#head = null;
    this.#size = 0;
  }

  /* ================= Front Access ================= */

  front() {
    if (this.#head == null) {
      throw new Error("First value is not defined");
    } else {
      return this.#head.value;
    }
  }

  /* ================= Push & Pop ================= */

  push_front(val) {
    let dummy = new Node(val);
    dummy.next = this.#head;
    this.#head = dummy;
  }

  push_back(val) {
    let node = new Node(val);
    if (!this.#head) {
      this.#head = node;
      return;
    }
    let cur = this.#head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = node;
  }

  pop_front() {
    if (!this.#head) throw new Error("is not initsilization");
    let remove = this.#head;
    this.#head = remove.next;
    return remove;
  }

  pop_back() {
    if (!this.#head) throw new Error("is not initsilization");
    if (!this.#head.next) {
      this.#head = null;
    }
    let remove = this.#head;
    while (remove.next && remove.next.next) {
      remove = remove.next;
    }
    let removedArg = remove.next.val;
    remove.next = null;
    return removedArg;
  }

  /* ================= Random-like Access ================= */
  at(pos) {
    if (pos < 0 || pos >= this.#size) return;
    let cur = this.#head;
    let i = 0;
    while (i < pos) {
      cur = cur.next;
      i++;
    }
    return cur.value;
  }

  get(pos) {
    if (pos < 0 || pos > this.#size)
      throw new Error("Error size is a biging || small int");
    let cur = this.#head;
    let i = 0;
    while (i < pos) {
      cur = cur.next;
      i++;
    }
    return cur;
  }

  insert(pos, val) {
    if (pos < 0 || pos > this.#size)
      throw new Error("Error size is a biging || small int");
    if (pos === 0) {
      this.push_front(val);
      return;
    }
    let node = new Node(val);
    let prev = this.get(pos - 1);
    node.next = prev.next;
  }

  erase(index) {
    if (index < 0 || index < this.#size) throw new Error("Error");
    if (index === 0) this.pop_front();
    if (index === this.#size - 1) {
      this.pop_back();
    } else {
      let cur = this.#head;
      let prev = cur;
      for (let i = 0; i < index; ++i) {
        prev = cur;
        cur = cur.next;
      }
      prev.next = cur.next;
      this.#size--;
    }
  }
  remove(value, equals = (a, b) => a === b) {
    let res = [];
    let cur = this.#head;
    let i = 0;
    let index = [];
    while (cur) {
      if (equals(cur.value, value)) {
        res.push(cur.value);
        index.push(i);
      }
      i++;
      cur = cur.next;
    }
    let counter = 0;
    for (let o of index) this.erase(o - counter++);
    return res;
  }

  /* ================= Algorithms ================= */

  reverse() {
    if (!this.#head) throw new Error("NotInitsilization");
    let cur = this.#head;
    let prev = null;
    let next = null;
    while (cur) {
      next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    this.#head = prev;
  }

  sort(cmp = (a, b) => a - b) {
    if (!this.#head || !this.#head.next) return;

    const mergeSort = (head) => {
      if (!head || !head.next) return head;
      let slow = head;
      let fast = head.next;
      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      let mid = slow.next;
      slow.next = null; 
      let left = mergeSort(head);
      let right = mergeSort(mid);

      return merge(left, right);
    };

    const merge = (l1, l2) => {
      let dummy = new Node();
      let tail = dummy;

      while (l1 && l2) {
        if (cmp(l1.value, l2.value) <= 0) {
          tail.next = l1;
          l1 = l1.next;
        } else {
          tail.next = l2;
          l2 = l2.next;
        }
        tail = tail.next;
      }

      tail.next = l1 || l2;
      return dummy.next;
    };

    this.#head = mergeSort(this.#head);
  }

  /* ================= Utilities ================= */

  toArray() {
    if (!this.#head) throw new Error("heaf is nothing initzilization");
    let array = [];
    let lew = this.#head;
    while (lew) {
      array.push(lew.value);
      lew = lew.next;
    }
    return array;
  }

  static fromArray(arr) {
    let newLink = new SinglyLinkedList();
    for (let i = 0; i < arr.length; i++) {
      newLink.push(arr[i]);
    }
    return newLink;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let cur = this.#head;
    return {
      next() {
        if (!cur) {
          return {
            done: true,
            value: undefined,
          };
        }
        let val = cur.value;
        cur = cur.next;
        return {
          done: false,
          value: val,
        };
      },
    };
  }
}

let link = new SinglyLinkedList([5, 3, 8, 1, 2]);
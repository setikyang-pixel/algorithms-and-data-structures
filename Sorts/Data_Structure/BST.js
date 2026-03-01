class Node {
  constructor(value) {
    if (!value) throw new Error("Invalid Argument");
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  #root;
  #size;

  constructor() {
    this.#root = null;
    this.#size = 0;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  is_empty() {
    return this.#size === 0;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  /* ================= Insert / Delete ================= */

  insertIter(value) {
    if (value === undefined || value === null)
      throw new Error("Invalid Argument");
    let v = new Node(value);
    if (!this.#root) {
      this.#root = v;
      this.#size++;
      return;
    }
    let cur = this.#root;
    while (true) {
      if (value < cur.val) {
        if (!cur.left) {
          cur.left = v;
          this.#size++;
          return;
        }
        cur = cur.left;
      }
      if (value > cur.val) {
        if (!cur.right) {
          cur.right = v;
          this.#size++;
          return;
        }
        cur = cur.right;
      }
    }
  }

  insert(value) {
    if (value === undefined || value === null)
      throw new Error("Invalid Argument");
    this.#root = this.#_insert(this.#root, value);
    this.#size++;
  }

  delete(v) {
    if (!v) throw new Error("Invalid Arguments");
    this.#root = this.#_delete(this.#root, v);
    this.#size--;
  }

  contains(v) {
    if (!v) throw new Error("Invalid arguments");
    if (!this.#root) return;
    let node = this.#root;
    while (node) {
      if (node.val == v) return true;
      if (node.val > v) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;
  }

  /* ================= Height & Depth ================= */

  get_height() {
    if (!this.#root) return 0;
    return this.#_get_height(this.#root);
  }

  get_depth(value) {
    if (!value) throw new Error("Invalid Argument");
    return this.#_depth(value);
  }

  /* ================= Min / Max ================= */

  find_min() {
    return this.#_find_min(this.#root);
  }

  find_max() {
    return this.#_find_max(this.#root);
  }

  /* ================= Traversals ================= */

  level_order() {
    if (!this.#root) return;
    let queue = [this.#root];
    let res = [];
    while (queue.length) {
      let node = queue.shift();
      res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return res;
  }

  inorder_rec() {
    if (!this.#root) return null;
    return this.#_inorder(this.#root, []);
  }

  inorder_itr() {
    if (!this.#root) return;
    let stack = [];
    let res = [];
    let cur = this.#root;
    while (stack.length || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
    return res;
  }

  preorder_rec() {
    if (!this.#root) return null;
    return this.#_preorder(this.#root, []);
  }

  preorder_itr() {
    if (!this.#root) return;
    let stack = [this.#root];
    let res = [];
    while (stack.length) {
      let node = stack.pop();
      res.push(node.val);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return res;
  }

  postorder_rec() {
    if (!this.#root) return null;
    return this.#_postorder(this.#root, []);
  }

  postorder_itr() {
    if (!this.#root) return;
    let stack1 = [this.#root];
    let stack2 = [];
    while (stack1.length) {
      let node = stack1.pop();
      stack2.push(node.val);
      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }
    let i = 0;
    let j = stack2.length - 1;
    let hei = Math.floor(stack2.length / 2);
    while (hei--) {
      [stack2[i], stack2[j]] = [stack2[j], stack2[i]];
      i++;
      j--;
    }
    return stack2;
  }

  /* ================= Advanced Operations ================= */

  find_successor(value) {
    if (!value) throw new Error("Invalid Arguments");
    return this.#_find_successor(this.#root, value);
  }

  find_predecessor(v) {
    if (!v) throw new Error("Invalid Arguments");
    let cur = this.#root;
    let predecessor = null;
    while (cur) {
      if (cur.val < v) {
        predecessor = cur.val;
        cur = cur.right;
      } else {
        cur = cur.left;
      }
    }
    return predecessor;
  }

  is_balanced() {
    let i = 0;
    let j = 0;
    let cur1 = this.#root;
    let cur2 = this.#root;
    while (cur1) {
      cur1 = cur1.left;
      i++;
    }
    while (cur2) {
      cur2 = cur2.right;
      j++;
    }
    return i - j <= 1 ? true : false;
  }

  validate_BST() {
    let cur = this.#root;
    let prev = null;
    let stack = [];
    while (stack.length || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (prev !== null && cur.val <= prev.val) return false;
      prev = cur;
      cur = cur.right;
    }
    return true;
  }

  /* ================= Utilities ================= */

  toArray() {
    return this.inorder_itr();
  }

  clone() {
    let New = new BST();
    for (const i of this) {
      New.insertIter(i);
    }
    return New;
  }

  equals(otherTree) {
    if (!otherTree) throw new Error("Invalid Argument");
    if (this.size() !== otherTree.size()) return false;
    let arr1 = this.inorder_itr();
    let arr2 = otherTree.inorder_itr();
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let arr = this.inorder_itr();
    let i = 0;
    return {
      next: () => {
        if (arr[i]) return { value: arr[i++], done: false };
        else return { value: null, done: true };
      },
    };
  }

  *values(cur = this.#root) {
    if (!cur) return;
    yield* this.values(cur.left);
    yield cur.val;
    yield* this.values(cur.right);
  }

  *entries(cur = this.#root, index = { i: 0 }) {
    if (!cur) return;
    yield* this.entries(cur.left, index);
    yield [index.i++, cur.val];
    yield* this.entries(cur.right, index);
  }

  /* ================= Private Helpers ================= */
  #_depth(v, index = { i: 0 }) {
    if (!this.#root) return;
    if (this.#root > v) {
      if (this.#root.val == v) {
      }
    }
  }

  #_find_successor(node, v) {
    if (!node) return null;
    if (node.val > v) {
      let succ = this.#_find_successor(node.left, v);
      return succ !== null ? succ : node.val;
    } else {
      return this.#_find_successor(node.right, v);
    }
  }

  #_insert(node, value) {
    if (!node) return new Node(value);
    if (node.val > value) {
      node.left = this.#_insert(node.left, value);
    } else {
      node.right = this.#_insert(node.right, value);
    }
    return node;
  }
  #_delete(node, v) {
    if (!node) return null;
    if (node.val > v) {
      node.left = this.#_delete(node.left, v);
    } else if (node.val < v) {
      node.right = this.#_delete(node.right, v);
    } else {
      if (!node.left || !node.right) return node.left || node.right;
      let min = this.find_min(node.right);
      node.val = min.val;
      node.right = this.#_delete(node.right, min.val);
    }
    return node;
  }

  #_find_min(node) {
    if (!node) return;
    if (node.left) return (node.left = this.#_find_min(node.left));
    return node.val;
  }

  #_find_max(node) {
    if (!node) return;
    if (node.right) node.right = this.#_find_max(node.right);
    return node.val;
  }
  #_get_height(node) {
    if (!node) return 0;
    return (
      1 + Math.max(this.#_get_height(node.left), this.#_get_height(node.right))
    );
  }

  #_preorder(node, result) {
    if (!node) return;
    result.push(node.val);
    this.#_preorder(node.left, result);
    this.#_preorder(node.right, result);
    return result;
  }
  #_inorder(node, result) {
    if (!node) return;
    this.#_inorder(node.left, result);
    result.push(node.val);
    this.#_inorder(node.right, result);
    return result;
  }
  #_postorder(node, result) {
    if (!node) return;
    this.#_postorder(node.left, result);
    this.#_postorder(node.right, result);
    result.push(node.val);
    return result;
  }
}

const tree = new BST();
tree.insert(20);
tree.insert(15);
tree.insert(8);
tree.insert(30);
tree.insert(18);
tree.insert(25);
tree.insert(40);

console.log(tree.is_balanced());

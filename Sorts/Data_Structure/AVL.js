class Node {
  constructor(value = null) {
    this.val = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
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
    return this.#size === 0 && this.#root == null ? true : false;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  /* ================= Core AVL Operations ================= */

  insert(value) {
    if(!this.#root) {
        this.#root = value !== undefined ? new Node(value) : null;
        return;
    }
    if (value == null || value == undefined)
      throw new Error("Invalid Arguments");
    this.#size++;
    return this.#root = this.#insert(this.#root, value);
  }

  delete(value) {
    if (value == null || value == undefined)
      throw new Error("Invalid Arguments");
    this.#root = this.#delete(this.#root, value);
    this.#size--;
  }

  search(value) {
    if (!this.#root) return null;
    return this.#search(this.#root, value);
  }

  /* ================= Height / Min / Max ================= */

  getHeight() {
    if (!this.#root) return null;
    return this.#getHeight(this.#root);
  }

  getMin() {
    if (!this.#root) return null;
    return this.#getMin(this.#root);
  }

  getMax() {
    if (!this.#root) return null;
    return this.#getMax(this.#root);
  }

  /* ================= Traversals ================= */

  leveOrder() {
    if (this.#root) return null;
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

  preorder_rec() {
    if (!this.#root) return null;
    let res = [];
    this.#preorder_rec(this.#root, res);
    return res;
  }

  preorder_itr() {
    if (!this.#root) return null;
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

  inorder_rec() {
    if (!this.#root) return null;
    let res = [];
    this.#inorder_rec(this.#root, res);
    return res;
  }

  inorder_itr() {
    if (!this.#root) return null;
    let stack = [];
    let cur = this.#root;
    let res = [];
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

  postorder_rec() {
    if (!this.#root) return null;
    let res = [];
    this.#postorder_rec(this.#root);
    return res;
  }

  postorder_itr() {
    if (!this.#root) return null;
    let stack = [this.#root];
    let res = [];
    while (stack.length) {
      let node = stack.pop();
      res.push(node.val);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
    return res;
  }

  /* ================= AVL Balancing ================= */
  #update(node) {
    if (!node) return;
    node.height =
      1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
  }
  #insert(node, value) {
    if (!node) {
      this.#size++;
      return new Node(value);
    }
    if (node.val > value) {
      node.left = this.#insert(node.left, value);
    } else if (node.val < value) {
      node.right = this.#insert(node.right, value);
    } else {
      return node;
    }
    this.#update(node);
    this.#reBalance(node);
    return node
  }

  #delete(node, val) {
    if (!node) return node;
    if (node.val > val) {
      node.left = this.#delete(node.left, val);
    } else if (node.val < val) {
      node.right = this.#delete(node.right, val);
    } else {  
        if(!node.left) return node.right
        if(!node.right) return node.left;      
      let min = this.#getMin(node.right);
      node.val = min.val;
      node.right = this.#delete(node.right, min.val);
    }
    this.#update(node);
    return this.#reBalance(node);
  }

  #reBalance(node) {
    let bal = this.#bf(node);
    if (bal > 1) {
      if (this.#bf(node.left) < 0) {
        node.left = this.#rotateLeft(node.left);
      }
      return this.#rotateRight(node);
    } else if (bal < -1) {
      if (this.#bf(node.right) > 0) {
        node.right = this.#rotateRight(node.right);
      }
      return this.#rotateLeft(node);
    } 
      return node;
    
  }
  #bf(node) {
    return this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  #rotateRight(node) {
    let tmp = node.left;
    let tmp2 = tmp.right;
    tmp.right = node;
    node.left = tmp2;
    node.height = this.#getHeight(node);
    tmp.height = this.#getHeight(tmp);
    return tmp;
  }

  #rotateLeft(node) {
    let tmp = node.right;
    let tmp2 = tmp.left;
    tmp.left = node;
    node.right = tmp2;
    node.height = this.#getHeight(node);
    tmp.height = this.#getHeight(tmp);
    return tmp;
  }

  #getHeight(node) {
    if (!node) return;
    return node.height ? node.height : 0;
  }

  /* ================= BST Helpers ================= */

  #getMin(node) {
    if (!node) return;
    if (node.left) return this.#getMin(node.left);
  }

  #getMax(node) {
    if (!node) return;
    if (node.right) return this.#getMax(node.right);
  }

  #search(node, val) {
    if (!node) return false;
    if (node.val == val) return true;
    if (node.val > val) return this.#search(node.left, val);
    else return this.#search(node.right, val);
  }

  /* ================= DFS Helpers ================= */

  #preorder_rec(node, res = []) {
    if (!node) return;
    res.push(node.val);
    this.preorder_rec(node.left, res);
    this.preorder_rec(node.right, res);
    return res;
  }

  #inorder_rec(node, res = []) {
    if (!node) return;
    this.#inorder_rec(node.left, res);
    res.push(node.val);
    this.#inorder_rec(node.right, res);
    return res;
  }

  #postorder_rec(node, res = []) {
    if (!node) return;
    this.#postorder_rec(node.left, res);
    this.#postorder_rec(node.right, res);
    res.push(node.val);
    return res;
  }
  /* ================= Advanced AVL Utilities ================= */

  isBalanced() {
    return Math.abs(
      this.#getHeight(this.#root.left) - this.#getHeight(this.#root.right),
    ) <= 1
      ? true
      : false;
  }

  validateBST() {
    if (!this.#root) return null;
    let stack = [];
    let cur = this.#root;
    let prev = null;
    while (cur || stack.length) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur == null || cur == undefined || cur.val <= prev) return false;
      prev = cur.val;
      cur = cur.right;
    }
    return true;
  }

  findSuccessor(value) {
    if (value == null || value == undefined)
      throw new Error("Invalid Arguments");
    let cur = this.#root;
    let succ = null;
    while (cur) {
      if (cur.val > value) {
        succ = cur.val;
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    return succ;
  }

  findPredecessor(value) {
    if (value == null || value == undefined)
      throw new Error("Invalid Arguments");
    let cur = this.#root;
    let pred = null;
    while (cur) {
      if (cur.val < value) {
        pred = cur.val;
        cur = cur.right;
      } else {
        cur = cur.left;
      }
    }
    return pred;
  }

  toArray() {
    return this.inorder_rec();
  }

  clone() {
    let tree = new AVL();
    for (let i of this.#root) tree.insert(i);
    return tree;
  }

  equals(otherTree) {
    if (otherTree.size() != this.#size()) return false;
    let a = otherTree.inorder_rec();
    let b = this.inorder_rec();
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  /* ================= Iteration ================= */
  [Symbol.iterator]() {
    let cur = this.inorder_rec();
    let i = 0;
    return {
      next: () => {
        if (cur[i]) return { value: cur[i++], done: false };
        else return { value: null, done: true };
      },
    };
  }
*values(cur = this.#root) {
    if (!cur) return;
    if (cur.left) {
        yield* this.values(cur.left);
    }
    yield cur.val;
    if (cur.right) {
        yield* this.values(cur.right);
    }
  }
  *entries(root = this.#root, index = { i: 0 }) {
    if (!root) return;
    yield* this.entries(root.left, index);
    yield [index.i++, root.val];
    yield* this.entries(root.right, index);

  }
}

const avl = new AVL();

avl.insert(30);
avl.insert(18);
avl.insert(25);
avl.insert(40);
console.log(avl.inorder_rec());
avl.delete(18);
console.log(avl.inorder_rec());
let red = "red";
let black = "black";

class Node {
  constructor(val, nilNode = null) {
    this.val = val !== undefined ? val : null;
    this.left = nilNode;
    this.right = nilNode;
    this.parent = nilNode;
    this.col = red;
  }
}

class RBT {
  #nil;
  #root;
  #size = 0;

  constructor() {
    this.#nil = new Node(-1);
    this.#nil.col = black;
    this.#nil.left = this.#nil;
    this.#nil.right = this.#nil;
    this.#root = this.#nil;
  }

  insert(val) {
    let newNode = new Node(val, this.#nil);
    let parent = this.#nil;
    let cur = this.#root;

    while (cur !== this.#nil) {
      parent = cur;
      if (val < cur.val) {
        cur = cur.left;
      } else if (val > cur.val) {
        cur = cur.right;
      } else {
        return; // Արժեքն արդեն կա
      }
    }

    newNode.parent = parent;
    if (parent === this.#nil) {
      this.#root = newNode;
    } else if (val < parent.val) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    newNode.col = red;
    this.#size++;
    this._insertFixup(newNode);
  }

  _insertFixup(node) {
    while (node.parent.col === red) {
      let gp = node.parent.parent;
      if (node.parent === gp.left) {
        let uncle = gp.right;
        if (uncle.col === red) {
          node.parent.col = black;
          uncle.col = black;
          gp.col = red;
          node = gp;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this._leftRotate(node);
          }
          node.parent.col = black;
          node.parent.parent.col = red; // սա gp-ն է
          this._rightRotate(node.parent.parent);
        }
      } else {
        let uncle = gp.left;
        if (uncle.col === red) {
          node.parent.col = black;
          uncle.col = black;
          gp.col = red;
          node = gp;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this._rightRotate(node);
          }
          node.parent.col = black;
          node.parent.parent.col = red;
          this._leftRotate(node.parent.parent);
        }
      }
      if (node === this.#root) break;
    }
    this.#root.col = black;
  }

  _leftRotate(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left !== this.#nil) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === this.#nil) {
      this.#root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  _rightRotate(x) {
    let y = x.left;
    x.left = y.right;
    if (y.right !== this.#nil) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === this.#nil) {
      this.#root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    y.right = x;
    x.parent = y;
  }
}

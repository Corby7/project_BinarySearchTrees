import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    console.log(sortedArray);

    this.root = this.createBST(sortedArray, 0, sortedArray.length - 1);
    console.log(this.root);
  }

  createBST(sortedArray, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(sortedArray[mid]);

    node.leftChild = this.createBST(sortedArray, start, mid - 1);
    node.rightChild = this.createBST(sortedArray, mid + 1, end);

    return node;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;
    while (currentNode !== null) {
      if (value < currentNode.data) {
        if (currentNode.leftChild === null) {
          currentNode.leftChild = new Node(value);
          return;
        }
        currentNode = currentNode.leftChild;
      } else if (value > currentNode.data) {
        if (currentNode.rightChild === null) {
          currentNode.rightChild = new Node(value);
          return;
        }
        currentNode = currentNode.rightChild;
      } else {
        throw new Error("Trying to insert non-unique value");
      }
    }
  }

  deleteItem(value) {
    if (this.root === null) {
      throw new Error("No data to delete");
    }

    let isLeft = true;
    let previousNode = null;
    let currentNode = this.root;

    while (currentNode.data !== value) {
      if (value < currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.leftChild;
        isLeft = true;
      } else if (value > currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.rightChild;
        isLeft = false;
      } else {
        throw new Error("Value does not exist in this binary tree");
      }
    }

    let numChildren = 0;

    if (currentNode.leftChild !== null) numChildren++;
    if (currentNode.rightChild !== null) numChildren++;

    switch (numChildren) {
      case 0: //node is a leaf node
        if (isLeft) previousNode.leftChild = null;
        else previousNode.rightChild = null;
        break;
      case 1: //node with single child
        if (currentNode.leftChild !== null) {
          if (isLeft) previousNode.leftChild = currentNode.leftChild;
          else previousNode.rightChild = currentNode.leftChild;
        } else {
          //currentNode has a right child
          if (isLeft) previousNode.leftChild = currentNode.rightChild;
          else previousNode.rightChild = currentNode.rightChild;
        }
        break;
      case 2: //node with two children
        let successorParent = currentNode;
        let successor = currentNode.rightChild;

        // Find the in-order successor
        while (successor.leftChild !== null) {
          successorParent = successor;
          successor = successor.leftChild;
        }

        // Copy the successor's value to current node
        currentNode.data = successor.data;

        // Remove the successor
        if (successorParent !== currentNode) {
          successorParent.leftChild = successor.rightChild; // Bypass successor
        } else {
          successorParent.rightChild = successor.rightChild; // If the successor was the direct child
        }
        break;
    }
  }

  find(value) {
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) {
        console.log(`Value ${currentNode.data} found!`);
        return currentNode;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    throw new Error(`Value ${value} not found in this Binary Tree`);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length) {
      const currentNode = queue.shift(); //remove first node in queue
      callback(currentNode);
      if (currentNode.leftChild != null) queue.push(currentNode.leftChild);
      if (currentNode.rightChild != null) queue.push(currentNode.rightChild);
    }
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const order = (rootNode) => {
      if (rootNode == null) return;
      callback(rootNode);
      order(rootNode.leftChild);
      order(rootNode.rightChild);
    };

    order(this.root);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const order = (rootNode) => {
      if (rootNode == null) return;
      order(rootNode.leftChild);
      callback(rootNode);
      order(rootNode.rightChild);
    };

    order(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const order = (rootNode) => {
      if (rootNode == null) return;
      order(rootNode.leftChild);
      order(rootNode.rightChild);
      callback(rootNode);
    };

    order(this.root);
  }

  height(node) {
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const findHeight = (node) => {
      if (node == null) return -1;
      let leftHeight = findHeight(node.leftChild);
      let rightHeight = findHeight(node.rightChild);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return findHeight(node);
  }

  depth(node) {
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const findDepth = (node, targetNode, depth = 0) => {
      if (node == null) return -1;
      if (node === targetNode) return depth;

      let leftDepth = findDepth(node.leftChild, targetNode, depth + 1);
      if (leftDepth !== -1) return leftDepth;

      let rightDepth = findDepth(node.rightChild, targetNode, depth + 1);
      return rightDepth;
    };

    return findDepth(this.root, node);
  }

  isBalanced() {
    if (this.root == null) {
      throw new Error("No Binary Tree found");
    }

    const heightLeftSubTree = this.height(this.root.leftChild);
    const heightRightSubTree = this.height(this.root.rightChild);

    return Math.abs(heightLeftSubTree - heightRightSubTree) <= 1;
  }

  rebalance() {
    const isBalanced = this.isBalanced();
    if (isBalanced) {
      console.log("Binary Tree is already balanced.");
      return;
    }

    const array = [];

    const collectValues = (node) => {
      if (node == null) return;
      array.push(node.data);
      collectValues(node.leftChild);
      collectValues(node.rightChild);
    };
    collectValues(this.root);

    console.log(array);
    return this.buildTree(array);
  }
}

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
}

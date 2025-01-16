import Tree from "./tree.js";
import Node from "./node.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const createRandomArray = (size = 10) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * 100); // Random numbers 0-99
    array.push(randomNumber);
  }
  return array;
};

//Step 1: Create a binary search tree from an array of random numbers
const randomArray = createRandomArray();
const tree = new Tree();
tree.buildTree(randomArray);
prettyPrint(tree.root);

//Step 2: Confirm that the tree is balanced
console.log("\nIs Tree balanced: " + tree.isBalanced());

//Step 3: Print out all elements in level, pre, post, and in order
console.log("\nTesting iterative level order traversal:");
const iterativeResult = [];
tree.levelOrder((node) => iterativeResult.push(node.data));
console.log(iterativeResult);

console.log("Testing Preorder traversal:");
const preOrderResult = [];
tree.preOrder((node) => preOrderResult.push(node.data));
console.log(preOrderResult);

console.log("Testing Inorder traversal:");
const inOrderResult = [];
tree.inOrder((node) => inOrderResult.push(node.data));
console.log(inOrderResult);

console.log("Testing Postorder traversal:");
const postOrderResult = [];
tree.postOrder((node) => postOrderResult.push(node.data));
console.log(postOrderResult);

//Step 4: Unbalance the tree by adding several numbers > 100
console.log("\nUnbalancing the tree with numbers > 100...");
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
prettyPrint(tree.root);

//Step  5: Confirm that the tree is unbalanced by calling isBalanced
console.log("\nIs Tree balanced: " + tree.isBalanced());

//Step 6: Balance the tree by calling rebalance
tree.rebalance();
console.log("");
prettyPrint(tree.root);

//Step 7: Confirm that the tree is balanced by calling isBalanced
console.log("\nIs Tree balanced: " + tree.isBalanced());

//Step 8: Print out all elements in level, pre, post, and in order
console.log("\nTesting iterative level order traversal:");
const iterativeResult2 = [];
tree.levelOrder((node) => iterativeResult2.push(node.data));
console.log(iterativeResult2);

console.log("Testing Preorder traversal:");
const preOrderResult2 = [];
tree.preOrder((node) => preOrderResult2.push(node.data));
console.log(preOrderResult2);

console.log("Testing Inorder traversal:");
const inOrderResult2 = [];
tree.inOrder((node) => inOrderResult2.push(node.data));
console.log(inOrderResult2);

console.log("Testing Postorder traversal:");
const postOrderResult2 = [];
tree.postOrder((node) => postOrderResult2.push(node.data));
console.log(postOrderResult2);

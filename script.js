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

const test = new Tree();
const test2 = new Tree();
test.buildTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 250, 6555, 6666, 6667, 10,
]);
prettyPrint(test.root);

console.log("");

test.deleteItem(67);
prettyPrint(test.root);

console.log("Testing iterative level order traversal:");
const iterativeResult = [];
test.levelOrder((node) => iterativeResult.push(node.data));
console.log(iterativeResult);

console.log("Testing Preorder traversal:");
const preOrderResult = [];
test.preOrder((node) => preOrderResult.push(node.data));
console.log(preOrderResult);

console.log("Testing Inorder traversal:");
const inOrderResult = [];
test.inOrder((node) => inOrderResult.push(node.data));
console.log(inOrderResult);

console.log("Testing Postorder traversal:");
const postOrderResult = [];
test.postOrder((node) => postOrderResult.push(node.data));
console.log(postOrderResult);

console.log("Height :" + test.height(test.root));
console.log("Depth :" + test.depth(test.root.rightChild.rightChild.rightChild));
console.log("Is balanced: " + test.isBalanced());
console.log("Rebalance: " + test.rebalance());

const tree = new Tree();
tree.root = new Node(1);
tree.root.rightChild = new Node(2);
tree.root.rightChild.rightChild = new Node(3);
tree.root.rightChild.rightChild.rightChild = new Node(4);

console.log("Is balanced before:", tree.isBalanced());
prettyPrint(tree.root);
tree.rebalance();
console.log("Is balanced after:", tree.isBalanced());

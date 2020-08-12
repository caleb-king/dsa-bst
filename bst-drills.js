import BinarySearchTree from './BinarySearchTree.js';

function sumAllNodes(t) {
  if (!t) {
    return 0;
  }
  return sumAllNodes(t.left) + t.value + sumAllNodes(t.right);
}

function getHeight(bst) {
  if (!bst.key) return -1;
  if (!bst.left && !bst.right) return 0;

  // initialize an array to house the height of all paths from root to leaf nodes
  const heightArr = [];

  // recursive function for getting the height of all paths from root to leaf nodes
  function getHeightRecursively(t, height) {
    if (!t.left && !t.right) {
      heightArr.push(height);
    } else {
      if (t.left) {
        getHeightRecursively(t.left, height + 1);
      }

      if (t.right) {
        getHeightRecursively(t.right, height + 1);
      }
    }
  }

  getHeightRecursively(bst, 0);

  // find the maximum height and return that
  let currMax = 1;
  for (let i = 0; i < heightArr.length; i += 1) {
    if (heightArr[i] > currMax) {
      currMax = heightArr[i];
    }
  }
  return currMax;
}

function isTreeBST(bst) {
  const orderedKeys = [];

  function traverse(t) {
    if (t.left) traverse(t.left);
    orderedKeys.push(t.key);
    if (t.right) traverse(t.right);
  }

  traverse(bst);

  // check that the keys are ordered
  for (let i = 1; i < orderedKeys.length; i += 1) {
    if (orderedKeys[i - 1] > orderedKeys[i]) return false;
  }
  return true;
}

function thirdLargestNode(bst) {
  let distanceFromEnd = 0;
  let thirdLargest = null;

  function traverseReverse(t) {
    if (t.right) traverseReverse(t.right);
    distanceFromEnd += 1;
    if (distanceFromEnd === 3) {
      thirdLargest = t;
    }
    if (t.left) traverseReverse(t.left);
  }

  traverseReverse(bst);

  return thirdLargest;
}

function isTreeBalanced(bst) {
  if (!bst.key) return true;
  if (!bst.left && !bst.right) return true;

  // initialize an array to house the height of all paths from root to leaf nodes
  const heightArr = [];

  // recursive function for getting the height of all paths from root to leaf nodes
  function getHeightRecursively(t, height) {
    if (!t.left && !t.right) {
      heightArr.push(height);
    } else {
      if (t.left) {
        getHeightRecursively(t.left, height + 1);
      }

      if (t.right) {
        getHeightRecursively(t.right, height + 1);
      }
    }
  }

  getHeightRecursively(bst, 0);

  // find the max and min height
  let currMax = heightArr[0];
  let currMin = heightArr[0];
  for (let i = 1; i < heightArr.length; i += 1) {
    if (heightArr[i] > currMax) {
      currMax = heightArr[i];
    }
    if (heightArr[i] < currMin) {
      currMin = heightArr[i];
    }
  }

  console.log(`${currMax} - ${currMin} = ${currMax - currMin}`);

  // find differences in max and min height. > 1 is NOT a balanced tree
  return currMax - currMin < 2;
}

function areTreesIdentical(seq1, seq2) {
  // base cases
  if (seq1.length !== seq2.length) return false;
  if (seq1.length === 0) return true;
  if (seq1[0] !== seq2[0]) return false;

  const left1 = [];
  const right1 = [];
  const left2 = [];
  const right2 = [];

  for (let i = 1; i < seq1.length; i += 1) {
    if (seq1[i] < seq1[0]) {
      left1.push(seq1[i]);
    } else {
      right1.push(seq1[i]);
    }
    if (seq2[i] < seq2[0]) {
      left2.push(seq2[i]);
    } else {
      right2.push(seq2[i]);
    }
  }

  return areTreesIdentical(left1, left2) && areTreesIdentical(right1, right2);
}

function main() {
  const BST = new BinarySearchTree();
  const numericalDataForBST = [3, 1, 4, 6, 9, 2, 5, 7];
  // const numericalDataForBST = [5, 3, 7, 1, 4, 2, 6, 9]; // balanced
  numericalDataForBST.forEach(inputValue => {
    BST.insert(inputValue, inputValue);
  });
  // const alphabeticalDataForBST = 'EASYQUESTION';
  // alphabeticalDataForBST.split('').forEach(inputValue => {
  //   BST.insert(inputValue);
  // });
  // console.log(BST);
  // console.log(getHeight(BST));
  // console.log(isTreeBST(BST));
  // console.log(thirdLargestNode(BST));
  // console.log(isTreeBalanced(BST));
  const sequence1 = [3, 5, 4, 6, 1, 0, 2];
  const sequence2 = [3, 1, 5, 2, 4, 6, 0];
  console.log(areTreesIdentical(sequence1, sequence2));
}

main();

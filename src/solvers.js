/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var validRows = [];
  if (n === 1) {
    return [[1]];
  }

  for (var i = 0; i < n; i++) {
    var row = new Array(n);
    row.fill(0);
    row[i] = 1;
    validRows.push(row);
  }

  for (var i = 0; i < validRows.length; i++) {
    solution.push(validRows[i]);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var validRows = [];
  if (n === 1) {
    return [[1]];
  }
  if (n === 0) {
    return [];
  }
  if (n === 3) {
    return [[], [], []];
  }
  if (n === 2) {
    return [[], []];
  }

  for (var i = 0; i < n; i++) {
    var row = new Array(n);
    row.fill(0);
    row[i] = 1;
    validRows.push(row);
  }

  var allOptions = perm(validRows);

  for (var i = 0; i < allOptions.length; i++) {
    var tempBoard = new Board(allOptions[i]);
    if (!tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(allOptions[i]));
      return allOptions[i];
    }
  }
  return 'Oops, no solution found.';
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solutions = [];
  var validRows = [];
  if (n === 1 || n === 0) {
    return 1;
  }
  if (n === 3 || n === 2) {
    return 0;
  }

  for (var i = 0; i < n; i++) {
    var row = new Array(n);
    row.fill(0);
    row[i] = 1;
    validRows.push(row);
  }

  var allOptions = perm(validRows);

  for (var i = 0; i < allOptions.length; i++) {
    var tempBoard = new Board(allOptions[i]);
    if (!tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()) {
      solutionCount++;
      solutions.push(tempBoard);
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var factorial = function(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};


var perm = function (values, currentCombo, allPerm) {
  currentCombo = currentCombo || [];
  allPerm = allPerm || [];

  //base case
  if (values.length < 1) {
    allPerm.push(currentCombo);
    return allPerm;
  }
  for (var i = 0; i < values.length; i++) {
    var copy = values.slice();
    var value = copy.splice(i, 1);
    perm(copy, currentCombo.concat(value), allPerm);
  }
  return allPerm;
};



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
  var first;
  var validRows = [], board = [];
  if (n === 0) return [];
  if (n === 1) return [[1]];
  if (n === 2) return [[], []];
  if (n === 3) return [[], [], []];

  for (var i = 0; i < n; i++) {
    validRows.push(i);
  }

  first = permOne(validRows)[0];
  for(var i = 0; i < first.length; i++) {
    var row = new Array(n);
    row.fill(0);
    row[first[i]] = 1;
    board[i] = row;
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var validOptions;
  var validRows = [];
  if (n === 1 || n === 0) return 1;
  if (n === 3 || n === 2) return 0;

  for (var i = 0; i < n; i++) {
    validRows.push(i);
  }

  validOptions = permAll(validRows);

  console.log('Number of solutions for ' + n + ' queens:', validOptions.length);
  return validOptions.length;
};

var permOne = function (values, currentCombo, perm) {
  currentCombo = currentCombo || [];
  perm = perm || [];

  if (values.length < 1) {
    if (!hasDiagonalConflicts(currentCombo)) {
      perm.push(currentCombo);
      return perm;
    }
    return perm;
  }
  for (var i = 0; i < values.length; i++) {
    if (perm.length > 0) return perm;
    var copy = values.slice();
    var value = copy.splice(i, 1);
    permOne(copy, currentCombo.concat(value), perm);
  }
  return perm;
};

var permAll = function (values, currentCombo, allPerm) {
  currentCombo = currentCombo || [];
  allPerm = allPerm || [];

  if (values.length < 1) {
    if (!hasDiagonalConflicts(currentCombo)) {
      allPerm.push(currentCombo);
    }
    return allPerm;
  }
  for (var i = 0; i < values.length; i++) {
    var copy = values.slice();
    var value = copy.splice(i, 1);
    permAll(copy, currentCombo.concat(value), allPerm);
  }
  return allPerm;
};

var hasDiagonalConflicts = function(board) {
  for (var i = 0; i < board.length - 1; i++) {
    for (var j = i + 1; j < board.length; j++) {
      var rowVariance = Math.abs(i - j);
      var colVariance = Math.abs(board[i] - board[j]);
    	if (rowVariance === colVariance) {
    	  return true;
    	}
    }
  }
  return false;
};

var factorial = function(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

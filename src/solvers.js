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
  var validOptions;
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
  var validOptions = perm(validRows);

  return validOptions[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var validOptions;
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

  var validOptions = perm(validRows);

  console.log('Number of solutions for ' + n + ' queens:', validOptions.length);
  return validOptions.length;
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

  if (values.length < 1) {
    if (!hasAnyMinorConflicts(currentCombo) && !hasAnyMajorConflicts(currentCombo)) {
      allPerm.push(currentCombo);
    }
    return allPerm;
  }
  for (var i = 0; i < values.length; i++) {
    var copy = values.slice();
    var value = copy.splice(i, 1);
    perm(copy, currentCombo.concat(value), allPerm);
  }
  return allPerm;
};

var hasMajorConflictAt = function(colNum, arr) {
  var count = 0;
  var count2 = 0;

  for (var i = 0; i < arr.length - colNum; i++) {
    count += arr[colNum + i][i];
    count2 += arr[i][colNum + i];
  }

  return count > 1 || count2 > 1;
};


var hasAnyMajorConflicts = function(arr) {
  return _.reduce(arr, function(acc, row, key) {
    return acc || hasMajorConflictAt(key, arr);
  }, false);
};

var hasMinorConflictAt = function(colNum, arr) {
  var n = arr.length;
  var count = 0;
  var col = colNum;

  for (var row = 0; col >= 0 && row < n; row++) {
    if (col < n) {
      count += arr[row][col];
    }
    col--;
  }
  return count > 1;
};

var hasAnyMinorConflicts = function(arr) {
  var result = false;
  for (var i = 0; i < arr.length * 2; i++) {
    result = result || hasMinorConflictAt(i, arr);
  }
  return result;
};

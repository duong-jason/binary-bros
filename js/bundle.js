(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const { print, prettify } = require("./util.js");

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

// O(n^2)
global.naive_max_sum = function (arr, n) {
  let [max_sum, max_subarr] = [arr[0], [arr[0]]];

  const combinations = function* (arr) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j <= n; j++) {
        print(
          `${i + 1}) ` +
            prettify(arr, i, j, "Orange") +
            " = " +
            arr.slice(i, j).sum()
        );
        yield [arr.slice(i, j).sum(), arr.slice(i, j)];
      }
      print();
    }
  };

  for (const [curr_sum, sub_arr] of combinations(arr)) {
    if (curr_sum > max_sum) {
      [max_sum, max_subarr] = [curr_sum, sub_arr];
    }
    print(
      `Max Sum = ${max_sum} and Max Sum Subarray = ${max_subarr.join(", ")}`
    );
  }
  print(`Max sum subarray: ${max_subarr.join(", ")}`);
  print(`Max sum: ${max_sum}`);
  return max_sum;
};

// O(n) -- \ref{https://en.wikipedia.org/wiki/Maximum_subarray_problem}
// for any n-tuple, (a, ..., b, c) \in arr s.t. 1 < |a, ..., b| < n, c > \sum_{i=a}^{c} i \iff \sum_{i=a}^{b} i < 0
// NOTE: the algorithm will choose the full array, [1, 2, -3, 4], instead of [4]
global.optimal_max_sum = function (arr, n) {
  let [max_sum, max_subarr] = [arr[0], [arr[0]]];
  let curr_sum = 0;

  for (let i = (j = 0); i < n; i++) {
    // negative subarrays will always reduce the current maximum sum
    if (curr_sum < 0) {
      [curr_sum, j] = [0, i];
    }
    if ((curr_sum += arr[i]) > max_sum) {
      [max_sum, max_subarr] = [curr_sum, arr.slice(j, i + 1)];
    }
    print(
      `${i + 1}) ` +
        prettify(arr, j, i + 1, curr_sum < 0 ? "Tomato" : "MediumSeaGreen") +
        " = " +
        curr_sum
    );
    print(
      `Max Sum = ${max_sum} and Max Sum Subarray = ${max_subarr.join(", ")}`
    );
  }
  print(`\nMax sum subarray: ${max_subarr.join(", ")}`);
  print(`Max sum: ${max_sum}`);
  return max_sum;
};

module.exports = {
  naive_max_sum,
  optimal_max_sum,
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util.js":4}],2:[function(require,module,exports){
(function (global){(function (){
const { print, prettify } = require("./util.js");

var global_counter = 0;

global.bubble_sort = function (arr, n) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      print(
        `${i + 1}) ` +
          prettify(
            arr,
            j,
            j + 2,
            arr[j] > arr[j + 1] ? "Tomato" : "MediumSeaGreen"
          )
      );
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    print(`${i + 1}) ${arr.join(", ")}\n`);
  }
  print(`Sorted Array: ${arr.join(", ")}`);
  return arr;
};

global.merge_sort_wrapper = function (arr, n) {
  global_counter = 0;
  print(`\nSorted Array: ${merge_sort(arr, n).join(", ")}`);
};

function merge_sort(arr, n = null) {
  if (n === null) {
    n = arr.length;
  }

  if (n <= 1) {
    return arr;
  }

  const mid = Math.floor(n / 2);
  let [left, right] = [arr.slice(0, mid), arr.slice(mid)];

  print(
    `${(global_counter += 1)}) Split Array: ${prettify(
      arr,
      mid - 1,
      mid + 1,
      "Orange"
    )}`
  );

  return merge(merge_sort(left), merge_sort(right));
}

function merge(left, right) {
  const [n, m] = Array.from(arguments).map((x) => x.length);
  let c = [],
    p = 0,
    q = 0;

  while (p < n && q < m) {
    c.push(left[p] < right[q] ? left[p++] : right[q++]);
  }

  // either sorted arrays `a` or `b` must be empty and the other with at least one element
  let result = [...c, ...left.slice(p, n), ...right.slice(q, m)];
  print(`${(global_counter += 1)}) Merged Array: ${result.join(", ")}`);
  return result;
}

module.exports = {
  bubble_sort,
  merge_sort,
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util.js":4}],3:[function(require,module,exports){
(function (global){(function (){
const { print } = require("./util.js");
const { merge_sort } = require("./sort.js");

// O(nlogn)
global.naive_third_max = function (arr, n) {
  if (n < 3) {
    print("Third Max Element: N.A.");
    return null;
  }

  // FIXME: should always start at iteration 1 (reset iteration in every run)
  const sorted_arr = merge_sort(arr, n);
  const t_max = sorted_arr[sorted_arr.length - 3];

  print(`\nThird max element: ${t_max}`);
  return t_max;
};

// O(n)
global.optimal_third_max = function (arr, n) {
  if (n < 3) {
    print("Third Max Element: N.A.");
    return null;
  }

  let f_max = (s_max = t_max = Number.NEGATIVE_INFINITY);

  for (let i = 0; i < n; i++) {
    if (arr[i] >= f_max) {
      (t_max = s_max), (s_max = f_max), (f_max = arr[i]);
    } else if (arr[i] >= s_max) {
      (t_max = s_max), (s_max = arr[i]);
    } else if (arr[i] >= t_max) {
      t_max = arr[i];
    }
    print(
      `${i + 1}) First Max: ${
        f_max == Number.NEGATIVE_INFINITY ? "?" : f_max
      }, Second Max: ${
        s_max == Number.NEGATIVE_INFINITY ? "?" : s_max
      }, Third Max: ${t_max == Number.NEGATIVE_INFINITY ? "?" : t_max}`
    );
  }
  print(`\nThird max element: ${t_max}`);
  return t_max;
};

module.exports = {
  naive_third_max,
  optimal_third_max,
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./sort.js":2,"./util.js":4}],4:[function(require,module,exports){
(function (global){(function (){
global.print = function (message = "") {
  if (document.getElementById(global_tag)) {
    document.getElementById(global_tag).innerHTML +=
      message.replace("\n", "<br>") + "<br>";
  }
};

global.prettify = function (arr, start, end, color) {
  var output = [];
  output.push(...arr.slice(0, start));
  output.push(
    `<span style='color: ${color};'>${arr.slice(start, end).join(", ")}</span>`
  );
  output.push(...arr.slice(end));
  return output.join(", ");
};

function preprocess(elements) {
  // Language accepts any comma-spaced sequence of signed decimal numbers
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (!pattern.test(elements)) {
    throw new TypeError();
  }
  return elements.split(", ").map(Number);
}

var global_tag;

global.run = function (algo, arr, n, tag) {
  try {
    // Start the clock once user presses the run button
    const START_TIME = performance.now();

    if (arr == ":3") {
      function range(size, min, max) {
        r = [];
        for (let i = 0; i < size; i++) {
          r.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return r;
      }
      arr = range(10, -8, 7);
      n = arr.length;
    } else {
      arr = preprocess(arr);
    }

    if (n != arr.length) {
      throw new RangeError();
    }

    global_tag = tag;
    algo(arr, n);

    // Stop the clock once the algorithm finishes execution
    const END_TIME = performance.now();
    print(
      `\nAlgorithm execution time: ${(END_TIME - START_TIME).toFixed(6)} ms`,
      tag
    );
  } catch (e) {
    if (e instanceof TypeError) {
      alert("Please enter comma-spaced numerical values (e.g., 1, -23, 45.67)");
    } else if (e instanceof RangeError) {
      alert(`Expected Size=${n !== "" ? n : "N.A."}, Got Size=${arr.length}`);
    }
  }
};

module.exports = { print, prettify };

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1,2,3]);

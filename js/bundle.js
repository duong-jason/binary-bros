(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const { print, prettify } = require("./util.js");

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

// O(n^2)
global.naive_max_sum = function (arr, n) {
  let [max_sum, max_sum_subarr] = [arr[0], [arr[0]]];

  const combinations = function* (arr) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j <= n; j++) {
        print(prettify(arr, i, j) + " = " + arr.slice(i, j).sum(), (counter = true));
        yield [arr.slice(i, j).sum(), arr.slice(i, j)];
      }
      print();
    }
  };

  for (const [curr_sum, curr_subarr] of combinations(arr)) {
    if (curr_sum > max_sum) {
      [max_sum, max_sum_subarr] = [curr_sum, curr_subarr];
    }
    print(`Max Sum = ${max_sum} and Max Sum Subarray = ${max_sum_subarr}`);
  }
  print(`Max sum subarray: ${max_sum_subarr}`);
  print(`Max sum: ${max_sum}`);
  return max_sum;
};

// O(n) -- \ref{https://en.wikipedia.org/wiki/Maximum_subarray_problem}
// for any n-tuple, (a, ..., b, c) \in arr s.t. 1 < |a, ..., b| < n,
// c > \sum_{i=a}^{c} i \iff \sum_{i=a}^{b} i < 0
global.optimal_max_sum = function (arr, n) {
  let [max_sum, max_sum_subarr] = [arr[0], [arr[0]]];
  let curr_sum = (wnd_ptr = 0);

  for (let i = 0; i < n; i++) {
    // negative subarrays will always reduce the current maximum sum
    if (curr_sum < 0) {
      [curr_sum, wnd_ptr] = [0, i];
    }

    // NOTE: the algorithm will choose the full array, [1, 2, -3, 4], instead of [4]
    if ((curr_sum += arr[i]) > max_sum) {
      max_sum = curr_sum;
      max_sum_subarr = arr.slice(wnd_ptr, i + 1);
    }

    print(
      prettify(arr, wnd_ptr, i + 1, curr_sum < 0) + " = " + curr_sum,
      (counter = true)
    );
    print(`Max Sum = ${max_sum} and Max Sum Subarray = ${max_sum_subarr}`);
  }
  print(`\nMax sum subarray: ${max_sum_subarr}`);
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

global.bubble_sort = function (arr, n) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      print(prettify(arr, j, j + 2, arr[j] > arr[j + 1]), (counter = true));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    print(prettify(arr, n - i - 1, n, "LightGray") + "\n", (counter = true));
  }
  print(`Sorted Array: ${arr}`);
  return arr;
};

global.merge_sort_wrapper = function (arr, n) {
  const sorted_arr = merge_sort(arr, n);
  if (n > 1) {
    print();
  }
  print(`Sorted Array: ${sorted_arr}`);
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
  print("Split Array: " + prettify(arr, mid - 1, mid + 1), (counter = true));

  let merged_arr = merge(merge_sort(left), merge_sort(right));
  print(`Merged Array: ${merged_arr}`, (counter = true));

  return merged_arr;
}

function merge(left, right) {
  const [n, m] = Array.from(arguments).map((x) => x.length);
  let c = [],
    p = 0,
    q = 0;

  while (p < n && q < m) {
    c.push(left[p] < right[q] ? left[p++] : right[q++]);
  }

  // either one of sorted arrays must be empty and the other with at least one element
  return [...c, ...left.slice(p, n), ...right.slice(q, m)];
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
      `First Max: ${f_max == Number.NEGATIVE_INFINITY ? "?" : f_max}, ` +
        `Second Max: ${s_max == Number.NEGATIVE_INFINITY ? "?" : s_max}, ` +
        `Third Max: ${t_max == Number.NEGATIVE_INFINITY ? "?" : t_max}`,
      (counter = true)
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
var global_tag, global_counter;

Array.prototype.toString = function () {
  return this.join(", ");
};

global.clear_display = function (tag) {
  if (document.getElementById(tag).innerHTML) {
    document.getElementById(tag).innerHTML = "";
  }
};

global.print = function (message = "", counter = false) {
  const algorithm_box = document.getElementById(global_tag);

  if (algorithm_box) {
    message = message.replace("\n", "<br>");
    // Display iteration number if counter is set to true
    if (counter) {
      algorithm_box.innerHTML += `${global_counter++}) `;
    }
    algorithm_box.innerHTML += message + "<br>";
  }
};

global.prettify = function (arr, start, end, color = "Orange") {
  if (typeof color == "boolean") {
    color = color ? "Tomato" : "MediumSeaGreen";
  }

  return [
    ...arr.slice(0, start),
    `<span style='color: ${color};'>${arr.slice(start, end)}</span>`,
    ...arr.slice(end),
  ].toString();
};

function preprocess(elements) {
  // Language accepts any comma-spaced sequence of signed decimal numbers
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (!pattern.test(elements)) {
    throw new TypeError();
  }
  return elements.split(", ").map(Number);
}

global.run = function (algo, arr, n, tag) {
  try {
    // Start the clock once user presses the run button
    const START_TIME = performance.now();

    clear_display(tag);

    // FIXME: remove this before sprint 4 presentation
    if (arr == ":3") {
      function range(size, min, max) {
        r = [];
        for (let i = 0; i < size; i++) {
          r.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return r;
      }
      arr = range(10, -15, 15);
      n = arr.length;
    } else {
      arr = preprocess(arr);
    }

    if (n != arr.length) {
      throw new RangeError();
    }

    global_tag = tag;
    global_counter = 1;

    algo(arr, n);

    // Stop the clock once the algorithm finishes execution
    const TOTAL_TIME = Math.round((performance.now() - START_TIME) * 1000);
    print(`\nAlgorithm execution time: ${TOTAL_TIME} ${String.fromCharCode(0xb5)}s`);
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

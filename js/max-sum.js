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
            arr.slice(i, j).sum(),
          "output-1"
        );
        yield [arr.slice(i, j).sum(), arr.slice(i, j)];
      }
      print("", "output-1");
    }
  };

  for (const [curr_sum, sub_arr] of combinations(arr)) {
    if (curr_sum > max_sum) {
      [max_sum, max_subarr] = [curr_sum, sub_arr];
    }
    print(
      `Max Sum = ${max_sum} and Max Sum Subarray = ${max_subarr.join(", ")}`,
      "output-1"
    );
  }
  print(`Max sum subarray: ${max_subarr.join(", ")}`, "output-1");
  print(`Max sum: ${max_sum}`, "output-1");
  return max_sum;
};

// O(n) -- \ref{https://en.wikipedia.org/wiki/Maximum_subarray_problem}
// for any n-tuple, (a, ..., b, c) \in arr s.t. 1 < |a, ..., b| < n, c > \sum_{i=a}^{c} i \iff \sum_{i=a}^{b} i < 0
// negative subarrays will always reduce the current maximum sum
// NOTE: the algorithm will choose the full array, [1, 2, -3, 4], instead of [4]
global.optimal_max_sum = function (arr, n) {
  if (n === "") {
    n = null;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, "output-2");
    throw new RangeError(message);
  }

  let [max_sum, max_subarr] = [arr[0], [arr[0]]];
  let curr_sum = 0;

  for (let i = (j = 0); i < n; i++) {
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
        curr_sum,
      "output-2"
    );
    print(
      `Max Sum = ${max_sum} and Max Sum Subarray = ${max_subarr.join(", ")}`,
      "output-2"
    );
  }
  print(`<br>Max sum subarray: ${max_subarr.join(", ")}`, "output-2");
  print(`Max sum: ${max_sum}`, "output-2");
  return max_sum;
};

module.exports = {
  naive_max_sum,
  optimal_max_sum,
};

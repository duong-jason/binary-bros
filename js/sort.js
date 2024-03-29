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

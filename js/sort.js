const { print, prettify } = require("./util.js");

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
          ),
        "output-1"
      );
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    print(`${i + 1}) ${arr.join(", ")}<br>`, "output-1");
  }
  print(`Sorted Array: ${arr.join(", ")}`, "output-1");
  return arr;
};

var i = 0;

global.merge_sort_wrapper = function (arr, n = null) {
  i = 0;
  let result = merge_sort(arr, n);
  print(`<br>Sorted Array: ${result.join(", ")}`, "output-2");
  return result;
};

function merge_sort(arr, n = null) {
  // either one element from split or input array with less than 1 element
  if (n === null) {
    n = arr.length;
  }

  if (n <= 1) {
    return arr;
  }

  const mid = Math.floor(n / 2);
  let [left, right] = [arr.slice(0, mid), arr.slice(mid)];

  print(
    `${(i += 1)}) Split Array: ${prettify(arr, mid - 1, mid + 1, "Orange")}`,
    "output-2"
  );

  return merge(merge_sort(left), merge_sort(right));
}

function merge(a, b) {
  const n = a.length,
    m = b.length;
  let c = [],
    p = 0,
    q = 0;

  while (p < n && q < m) {
    c.push(a[p] < b[q] ? a[p++] : b[q++]);
  }

  // either sorted array `a` or `b` must be empty and the other with at least one element
  let result = [...c, ...a.slice(p, n), ...b.slice(q, m)];
  print(`${(i += 1)}) Merged Array: ${result.join(", ")}`, "output-2");
  return result;
}

module.exports = {
  bubble_sort,
  merge_sort,
};

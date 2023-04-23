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

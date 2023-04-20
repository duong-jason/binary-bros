function print(msg, id) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML += msg + "<br>";
  }
}

var i = 0;

function merge_sort(arr, n = null) {
  if (n === null) {
    n = arr.length;
  }

  // either one element from split or input array with less than 1 element
  if (n <= 1) {
    return arr;
  }

  const mid = Math.floor(n / 2);
  let [left, right] = [arr.slice(0, mid), arr.slice(mid)];

  print(`${(i += 1)}) Split Array: ${arr.join(", ")}`, "output-1");

  return reverse_merge(merge_sort(left), merge_sort(right));
}

function reverse_merge(a, b) {
  const n = a.length,
    m = b.length;
  let c = [],
    p = 0,
    q = 0;

  while (p < n && q < m) {
    c.push(a[p] > b[q] ? a[p++] : b[q++]);
  }

  // either sorted array `a` or `b` must be empty and the other with at least one element
  let result = [...c, ...a.slice(p, n), ...b.slice(q, m)];
  print(`${(i += 1)}) Merged Array: ${result.join(", ")}`, "output-1");
  return result;
}

// O(nlogn)
function naive_third_max(arr, n) {
  if (n === "") {
    n = null;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, "output-1");
    throw new RangeError(message);
  }

  const start_time = performance.now()

  if (n < 3) {
    print("Third Max Element: N.A.", "output-1");
    return null;
  }

  i = 0;
  const sorted_arr = merge_sort(arr, n);
  const t_max = sorted_arr[2];

  print(`<br>Third max element: ${t_max}`, "output-1");
  print(`Execution Time: ${(performance.now() - start_time).toFixed(6)}`, "output-1")
  return t_max;
}

// O(n)
function optimal_third_max(arr, n) {
  if (n === "") {
    n = null;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, "output-2");
    throw new RangeError(message);
  }

  const start_time = performance.now()

  if (n < 3) {
    print("Third Max Element: N.A.", "output-2");
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
      `${i + 1}) First Max: ${f_max == Number.NEGATIVE_INFINITY ? "?" : f_max},
      Second Max: ${s_max == Number.NEGATIVE_INFINITY ? "?" : s_max},
      Third Max: ${t_max == Number.NEGATIVE_INFINITY ? "?" : t_max}`,
      "output-2"
    );
  }
  print(`<br>Third max element: ${t_max}`, "output-2");
  print(`Execution Time: ${(performance.now() - start_time).toFixed(6)}`, "output-2")
  return t_max;
}

module.exports = {
  naive_third_max,
  optimal_third_max,
};

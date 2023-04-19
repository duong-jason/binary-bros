function print(msg, id) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML += msg + "<br>";
  }
}

function prettify(arr, start, end, color) {
  var output = "";
  for (let i = 0; i < start; i++) {
    output += arr[i] + ", ";
  }
  output += `<span style='color: ${color};'> ${arr
    .slice(start, end)
    .join(", ")}</span>`;
  for (let i = end; i < arr.length; i++) {
    output += ", " + arr[i];
  }
  return output;
}

var i = 0;

function merge_sort(arr, n = null) {
  if (n === null) {
    n = arr.length;
  }

  let result = null;

  // either one element from split or input array with less than 1 element
  if (n <= 1) {
    result = arr;
  } else {
    const mid = Math.floor(n / 2);
    let [left, right] = [arr.slice(0, mid), arr.slice(mid)];

    print(
      `${(i += 1)}) Split Array: ${prettify(arr, mid - 1, mid + 1, "Orange")}`,
      "output-1"
    );
    result = reverse_merge(merge_sort(left), merge_sort(right));
  }

  print(`${(i += 1)}) Merged Array: ${result.join(", ")}`, "output-1");
  return result;
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
  return [...c, ...a.slice(p, n), ...b.slice(q, m)];
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
  } else if (n < 3) {
    print("Third Max Element: N.A.", "output-1");
    return null;
  }

  const sorted_arr = merge_sort(arr, n);
  const t_max = sorted_arr[2];

  print(
    `<br>Third max element: ${t_max}`,
    "output-1"
  );
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
  } else if (n < 3) {
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
      `${
        i + 1
      }) First Max: ${f_max}, Second Max: ${s_max}, Third Max: ${t_max}`,
      "output-2"
    );
  }
  print(
    `<br>Third max element: ${t_max}`,
    "output-2"
  );
  return t_max;
}

module.exports = {
  naive_third_max,
  optimal_third_max,
};

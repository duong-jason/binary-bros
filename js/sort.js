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

function bubble_sort(arr, n) {
  // FIXME: Expected size=, Got size=1
  // Happens when correct input to 'element' field but 'size' field wasn't specified
  if (n === "") {
    n = null;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, "output-1");
    throw new RangeError(message);
  }

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
    print(`Result: ${arr.join(", ")}`, "output-1");
  }
  print(`Sorted Array: ${arr.join(", ")}`, "output-1");
  return arr;
}

function merge_sort(arr, n = null) {
  if (n === "") {
    n = null;
  } else if (n === null) {
    n = arr.length;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, "output-2");
    throw new RangeError(message);
  }

  let result = null;

  // either one element from split or input array with less than 1 element
  if (n <= 1) {
    result = arr;
  } else {
    const mid = Math.floor(n / 2);
    let [left, right] = [arr.slice(0, mid), arr.slice(mid)];

    print(
      `Split Array: ${prettify(arr, mid - 1, mid + 1, "Orange")}`,
      "output-2"
    );
    result = merge(merge_sort(left), merge_sort(right));
  }

  print(`Merged Array: ${result.join(", ")}`, "output-2");
  return result;
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
  return [...c, ...a.slice(p, n), ...b.slice(q, m)];
}

module.exports = {
  bubble_sort,
  merge_sort,
};

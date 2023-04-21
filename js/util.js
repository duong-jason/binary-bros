global.print = function (msg, id) {
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML += msg + "<br>";
  }
};

global.prettify = function (arr, start, end, color) {
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
};

function preprocess(elements) {
  // Language accepts any comma-spaced sequence of signed decimal numbers
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (pattern.test(elements)) {
    return elements.split(", ").map(Number);
  }
  alert("Please enter comma-separated numerical values (e.g., 1, -23, 45.67)");
  // FIXME: TypeError: Cannot read properties of undefined (reading 'length')
  // Happens when no user input in the 'element' text field
}

global.run = function (alg, arr, n, tag) {
  const START_TIME = performance.now();

  arr = preprocess(arr);

  // If no input or incorrect elements (regardless of size) -> Pop-up error
  // If no input for size and correct input elements -> size=N.A.
  if (n === "") {
    n = null;
  }
  if (n != arr.length) {
    const message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`;
    print(message, tag);
    throw new RangeError(message);
  }

  alg(arr, n);

  print(
    `Execution Time: ${(performance.now() - START_TIME).toFixed(6)} ms`,
    tag
  );
};

module.exports = { print, prettify, preprocess, run };

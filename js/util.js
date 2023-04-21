global.print = function (message = "") {
  if (document.getElementById(global_tag)) {
    document.getElementById(global_tag).innerHTML +=
      message.replace("\n", "<br>") + "<br>";
  }
};

global.prettify = function (arr, start, end, color) {
  var output = "";
  for (let i = 0; i < start; i++) {
    output += arr[i] + ", ";
  }
  output += `<span style='color: ${color};'>${arr
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
    print(`Execution Time: ${(END_TIME - START_TIME).toFixed(6)} ms`, tag);
  } catch (e) {
    if (e instanceof TypeError) {
      alert("Please enter comma-spaced numerical values (e.g., 1, -23, 45.67)");
    } else if (e instanceof RangeError) {
      alert(`Expected Size=${n !== "" ? n : "N.A."}, Got Size=${arr.length}`);
    }
  }
};

module.exports = { print, prettify };

global.clear_display = function (tag) {
  if (document.getElementById(tag).innerHTML) {
    document.getElementById(tag).innerHTML = "";
  }
};

global.print = function (message = "", counter = false) {
  if (document.getElementById(global_tag)) {
    message = message.replace("\n", "<br>");
    if (counter) {
      document.getElementById(global_tag).innerHTML +=
        `${global_counter++}) ` + message + "<br>";
    } else {
      document.getElementById(global_tag).innerHTML += message + "<br>";
    }
  }
};

global.prettify = function (arr, start, end, color) {
  var output = [];
  output.push(...arr.slice(0, start));
  output.push(
    `<span style='color: ${color};'>${arr.slice(start, end).join(", ")}</span>`
  );
  output.push(...arr.slice(end));
  return output.join(", ");
};

function preprocess(elements) {
  // Language accepts any comma-spaced sequence of signed decimal numbers
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (!pattern.test(elements)) {
    throw new TypeError();
  }
  return elements.split(", ").map(Number);
}

var global_tag, global_counter;

global.run = function (algo, arr, n, tag) {
  try {
    // Start the clock once user presses the run button
    const START_TIME = performance.now();

    clear_display(tag);

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
    global_counter = 1;

    algo(arr, n);

    // Stop the clock once the algorithm finishes execution
    const END_TIME = performance.now();
    print(
      `\nAlgorithm execution time: ${(END_TIME - START_TIME).toFixed(6)} ms`
    );
  } catch (e) {
    if (e instanceof TypeError) {
      alert("Please enter comma-spaced numerical values (e.g., 1, -23, 45.67)");
    } else if (e instanceof RangeError) {
      alert(`Expected Size=${n !== "" ? n : "N.A."}, Got Size=${arr.length}`);
    }
  }
};

module.exports = { print, prettify };

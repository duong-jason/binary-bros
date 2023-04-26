var global_tag, global_counter;

Array.prototype.toString = function () {
  return this.join(", ");
};

global.clear_display = function (tag) {
  if (document.getElementById(tag).innerHTML) {
    document.getElementById(tag).innerHTML = "";
  }
};

global.print = function (message = "", counter = false) {
  const algorithm_box = document.getElementById(global_tag);

  if (algorithm_box) {
    message = message.replace("\n", "<br>");
    // Display iteration number if counter is set to true
    if (counter) {
      algorithm_box.innerHTML += `${global_counter++}) `;
    }
    algorithm_box.innerHTML += message + "<br>";
  }
};

global.prettify = function (arr, start, end, color = "Orange") {
  if (typeof color == "boolean") {
    color = color ? "Tomato" : "MediumSeaGreen";
  }

  return [
    ...arr.slice(0, start),
    `<span style='color: ${color};'>${arr.slice(start, end)}</span>`,
    ...arr.slice(end),
  ].toString();
};

function preprocess(elements) {
  // Language accepts any comma-spaced sequence of signed decimal numbers
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (!pattern.test(elements)) {
    throw new TypeError();
  }
  return elements.split(", ").map(Number);
}

global.run = function (algo, arr, n, tag) {
  try {
    // Start the clock once user presses the run button
    const START_TIME = performance.now();

    clear_display(tag);

    // FIXME: REMOVE THIS BEFORE END OF SPRINT 4
    if (arr == ":3") {
      function range(size, min, max) {
        r = [];
        for (let i = 0; i < size; i++) {
          r.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return r;
      }
      arr = range(10, -15, 15);
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
    const TOTAL_TIME = Math.round((performance.now() - START_TIME) * 1000);
    print(`\nAlgorithm execution time: ${TOTAL_TIME} ${String.fromCharCode(0xb5)}s`);
  } catch (e) {
    if (e instanceof TypeError) {
      alert("Please enter comma-spaced numerical values (e.g., 1, -23, 45.67)");
    } else if (e instanceof RangeError) {
      alert(`Expected Size=${n !== "" ? n : "N.A."}, Got Size=${arr.length}`);
    }
  }
};

module.exports = { print, prettify };

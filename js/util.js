var algorithm_box, global_counter;

class HaltException extends Error {}

Array.prototype.toString = function () {
  return this.join(", ");
};

global.clear_display = function (tag) {
  document.getElementById(tag).innerHTML = "";
};

global.print = function (message = "", counter = false) {
  // Stops Jest from complaining
  if (algorithm_box) {
    message = message.replaceAll("\n", "<br>");
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
  /* Language accepts any comma-spaced sequence of signed decimal numbers

  sign           ::=  '-'
  digit          ::=  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  digits         ::=  digit [digit]...
  decimal-part   ::=  [sign] digits ['.' digits]
  numeric-string ::=  decimal-part [', ' decimal-part]...
  */
  const pattern = /^-?\d+(\.\d+)?(,\s-?\d+(\.\d+)?)*$/;
  if (!pattern.test(elements)) {
    throw new HaltException(
      "Please enter comma-spaced numerical values (e.g., 1, -23, 45.67)"
    );
  }
  return elements.split(", ").map(Number);
}

global.run = function (algo, arr, n, tag) {
  try {
    // Start the clock once user presses the run button
    const START_TIME = performance.now();

    clear_display(tag);
    arr = preprocess(arr);

    if (n != arr.length) {
      throw new HaltException(
        `Expected Size=${n !== "" ? n : "N.A."}, Got Size=${arr.length}`
      );
    }

    algorithm_box = document.getElementById(tag);
    global_counter = 1;

    algo(arr, n);

    // Stop the clock once the algorithm finishes execution
    const TOTAL_TIME = Math.round((performance.now() - START_TIME) * 1000);
    print(`\nAlgorithm execution time: ${TOTAL_TIME} ${String.fromCharCode(0xb5)}s`);
  } catch (err) {
    if (err instanceof HaltException) {
      alert(err);
    } else {
      throw err;
    }
  }
};

module.exports = { print, prettify };

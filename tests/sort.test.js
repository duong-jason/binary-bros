const { bubble_sort, merge_sort } = require("../js/sort.js");
const modules = [bubble_sort, merge_sort];

function runner(func) {
  describe(func.name, () => {
    test("Single element input", () => {
      expect(func([1], 1)).toEqual([1]);
    });

    test("Even-length input", () => {
      expect(func([5, 4, 3, 2, 1, 0], 6)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("Odd-length input", () => {
      expect(func([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]);
    });

    test("Negative values input", () => {
      expect(func([-1, -2, -3, -4, -5], 5)).toEqual([-5, -4, -3, -2, -1]);
    });
  });
}

modules.forEach(runner);

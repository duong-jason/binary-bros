const { naive_third_max, optimal_third_max } = require("../js/third-max.js");
const modules = [naive_third_max, optimal_third_max];

function runner(func) {
  describe(func.name, () => {
    test("Invalid value for array length", () => {
      expect(() => {
        func([1], 2);
      }).toThrow("Expected size=2, Got size=1");
    });

    test("Less than three elements input", () => {
      expect(func([1], 1)).toEqual(null);
      expect(func([1, 2], 2)).toEqual(null);
    });

    test("Unsorted array input", () => {
      expect(func([5, 4, 3, 2, 1, 0], 6)).toEqual(3);
    });

    test("Duplicate values as distinct", () => {
      expect(func([1, 2, 2, 4], 4)).toEqual(2);
    });
  });
}

modules.forEach(runner);

const { naive_third_max, optimal_third_max }  = require('../js/third-max.js')
const third_max_modules = [naive_third_max, optimal_third_max]

function runner(third_max) {
    describe(third_max.name, () => {
        test("Invalid value for array length", () => {
            expect(() => {
                third_max([], 1)
            }).toThrow('Expected size=1, Got size=0')
        })

        test("Less than three elements input", () => {
            expect(third_max([], 0)).toEqual(null)
        })

        test("Unsorted array input", () => {
            expect(third_max([5, 4, 3, 2, 1, 0], 6)).toEqual(3)
        })
    })
}

third_max_modules.forEach(runner)

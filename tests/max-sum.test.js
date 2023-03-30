const { naive_max_sum, optimal_max_sum } = require('../js/max-sum.js')
const modules = [naive_max_sum, optimal_max_sum]

function runner(func) {
    describe(func.name, () => {
        test("Invalid value for array length", () => {
            expect(() => {
                func([1], 2)
            }).toThrow('Expected size=2, Got size=1')
        })

        test("Single element input", () => {
            expect(func([1], 1)).toEqual(1)
            expect(func([-1], 1)).toEqual(-1)
        })

        test("Only negative values", () => {
            expect(func([-6, -5, -4, -3, -2, -1], 6)).toEqual(-1)
        })

        test("Only positive values", () => {
            expect(func([1, 2, 3, 4, 5, 6], 6)).toEqual(21)
        })

        test("Mix of positive and negative values", () => {
            expect(func([-2, 1, -3, 4, -1, 2, 1, -5, 4], 9)).toEqual(6)
        })
    })
}

modules.forEach(runner)

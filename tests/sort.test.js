const { bubble, merge } = require('../sort.js') 

sort_functions = [bubble, merge]

function runner(sort) {
    describe(`${sort.name}`,  () => {
        test("Invalid input for array length", () => {
            expect(() => {
                sort([], 1)
            }).toThrow('Expected n=0, Got n=1')
        })

        test("Empty array input", () => {
            expect(sort([], 0)).toEqual([])
        })

        test("Single element input", () => {
            expect(sort([1], 1)).toEqual([1])
        })

        test("Even-length input", () => {
            const output = [0, 1, 2, 3, 4, 5]
            expect(sort([5, 4, 3, 2, 1, 0], 6)).toEqual(output)
        })

        test("Odd-length input", () => {
            const output = [1, 2, 3, 4, 5]
            expect(sort([1, 2, 3, 4, 5], 5)).toEqual(output)
        })

        test("Negative values input", () => {
            const output = [-5, -4, -3, -2, -1]
            expect(sort([-1, -2, -3, -4, -5], 5)).toEqual(output)
        })
    })
}

describe('Sorting Algorithms', () => {
    sort_functions.forEach(runner)
})
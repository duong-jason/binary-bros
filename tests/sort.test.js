const { bubble, merge } = require('../sort.js') 

sort_modules = [bubble, merge]

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
            expect(sort([5, 4, 3, 2, 1, 0], 6)).toEqual([0, 1, 2, 3, 4, 5])
        })

        test("Odd-length input", () => {
            expect(sort([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5])
        })

        test("Negative values input", () => {
            expect(sort([-1, -2, -3, -4, -5], 5)).toEqual([-5, -4, -3, -2, -1])
        })
    })
}

describe('Sorting Algorithms', () => {
    sort_modules.forEach(runner)
})

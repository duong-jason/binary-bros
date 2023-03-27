Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0)
}

function print(msg, id) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML += msg + '<br>'
    }
}

function prettify(arr, start, end, color) {
    var output = ''
    for (let i = 0; i < start; i++) {
        output += arr[i] + ', '
    }
    output += `<span style='color: ${color};'> ${arr.slice(start, end).join(', ')}</span>`
    for (let i = end; i < arr.length; i++) {
        output += ', ' + arr[i]
    }
    return output
}

// O(n^2)
function naive_max_sum(arr, n) {
    if (n === "") {
        n = null
    }
    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    let [max_sum, max_subarray] = [arr[0], arr]

    const combinations = function*(arr) {
        for (let i = 0; i < n; i++) {
            for (let j = i+1; j <= n; j++) {
                print(prettify(arr, i, j, "Orange") + ' = ' + arr.slice(i, j).sum(), 'output_1')
                yield [arr.slice(i, j), arr.slice(i, j).sum()]
            }
            print(`Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(', ')}`, 'output_1')
        }
    }

    for (const [sub_arr, curr_sum] of combinations(arr)) {
        if (curr_sum > max_sum) {
           [max_sum, max_subarray] = [curr_sum, sub_arr]
        }
    }
    return max_sum
}

// O(n) -- \ref{https://en.wikipedia.org/wiki/Maximum_subarray_problem}
function optimal_max_sum(arr, n) {
    if (n === "") {
        n = null
    }
    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    let [max_sum, max_subarray] = [arr[0], [arr[0]]]
    let curr_sum = 0

    for (let i = j = 0; i < n; i++) {
        // Negative subarrays will always reduces the maximum sum
        // NOTE: the algorithm will choose the full array, [1, 2, -3, 4], instead of [4]
        if (curr_sum < 0) {
            [curr_sum, j] = [0, i]
        }
        if ((curr_sum += arr[i]) > max_sum) {
            [max_sum, max_subarray] = [curr_sum, arr.slice(j, i+1)]
        }
        print(prettify(arr, j, i+1, (curr_sum < 0) ? 'Tomato' : 'MediumSeaGreen'), 'output_2')
        print(`Current Sum = ${curr_sum} and Max Sum = ${max_sum}`, 'output_2')
    }
    print(`Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(', ')}`, 'output_2')
    return max_sum
}

module.exports = { naive_max_sum, optimal_max_sum }

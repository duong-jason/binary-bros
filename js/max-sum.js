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

// O(n^3)
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
        let sub_arr = []
        for (let i = 0; i < n; i++) {
            for (let j = i+1; j <= n; j++) {
                sub_arr = arr.slice(i, j)
                print(prettify(arr, i, j, "Orange") + ' => ' + sub_arr.sum(), 'output')
                yield [arr.slice(i, j), sub_arr.sum()]
            }
            print(`Current Sum = ${sub_arr.sum()} and Max Sum = ${max_sum}`, 'output')
        }
    }

    for (const [sub_arr, curr_sum] of combinations(arr)) {
        if (curr_sum > max_sum) {
           max_sum = curr_sum
           max_subarray = sub_arr
        }
    }
    print(`Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(', ')}`, 'output')
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

    let [max_sum, max_subarray] = [arr[0], arr]
    let [curr_sum, last_idx] = [0, 0]

    for (let i = 0; i < n; i++) {
        /* Negative subarrays will always reduces the maximum sum */
        if (curr_sum < 0) {
            curr_sum = 0
            last_idx = i
        }
        curr_sum += arr[i]
        if (curr_sum >= max_sum) {
            max_sum = curr_sum
            max_subarray = arr.slice(last_idx, i+1)
        }
        print(prettify(arr, last_idx, i+1, (curr_sum < 0) ? 'Tomato' : 'MediumSeaGreen'), 'output')
        print(`Current Sum = ${curr_sum} and Max Sum = ${max_sum}`, 'output')
    }
    print(`Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(', ')}`, 'output')
    return max_sum
}

module.exports = { naive_max_sum, optimal_max_sum }

// O(n^3) - including reduce function
function naive_max_sum(arr, n) {
    if (n === "") n = null
    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    let max_sum = arr[0]
    let max_subarray = arr

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            curr_max = arr.slice(i, j+1).reduce((a, b) => a + b, 0)
            /* istanbul ignore next */
            if (document.getElementById('output')) {
                document.getElementById('output').innerHTML += `${i+j+1}) ` + arr.slice(i, j+1).join(' ') + ' => ' + curr_max + '<br>'
            }
            if (curr_max > max_sum) {
                max_sum = curr_max
                max_subarray = arr.slice(i, j+1)
            }
        }
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML += `Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(' ')}<br>`
        }
    }
    return max_sum
}

// O(n)
function optimal_max_sum(arr, n) {
    if (n === "") n = null
    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    let max_sum = arr[0]
    let curr_sum = 0

    let max_subarray = arr
    let last_idx = 0

    for (let i = 0; i < n; i++) {
        /* Negative subarrays always reduces the maximum sum*/
        if (curr_sum < 0) {
            curr_sum = 0
            last_idx = i
        }
        curr_sum += arr[i]
        if (curr_sum > max_sum) {
            max_sum = curr_sum
            max_subarray = arr.slice(last_idx, i+1)
        }
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML += `${i+1}) Current Sum = ${curr_sum} and Max Sum = ${max_sum}<br>`
        }
    }
    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += `Max Sum = ${max_sum} and Max Subarray = ${max_subarray.join(' ')}<br>`
    }
    return max_sum
}

module.exports = { naive_max_sum, optimal_max_sum }

function prettify(arr, start, color) {
    var output = ''
    for (let i = 0; i < start; i++) {
        output += ' ' + arr[i]
    }
    output += `<span style='color: ${color};'> ${arr[start]} ${arr[start+1]}</span>`
    for (let i = start+2; i < arr.length; i++) {
        output += ' ' + arr[i]
    }
    return output
}

function bubble_sort(arr, n) {
    var output = ''

    if (n != arr.length) {
        message = `Expected size=${n}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            output += `${i+1})` + prettify(arr, j, (arr[j] > arr[j+1]) ? 'red' : 'green') + '<br>'
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        output += `Result: ${arr}<br>`
    }
    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML = output + `Sorted Array ${arr}`
    }
    return arr
}

function merge_sort(arr, n=null) {
    if (n === null) {
        n = arr.length
    } else if (n != arr.length) {
        message = `Expected size=${n}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    /* either one element from split or input array with less than 1 element */
    /* TODO: does not print out for single elements */
    if (n <= 1) {
        return arr
    }

    let left = arr.slice(0, Math.floor(n/2))
    let right = arr.slice(Math.floor(n/2))

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += 'Split Array:'
        for (let i = 0; i < left.length; i++) {
            document.getElementById('output').innerHTML += ' ' + left[i]
        }
        document.getElementById('output').innerHTML += '&nbsp'.repeat(2)
        for (let i = 0; i < right.length; i++) {
            document.getElementById('output').innerHTML += ' ' + right[i]
        }
        document.getElementById('output').innerHTML += '<br>'
    }

    return merge(merge_sort(left), merge_sort(right))
}

function merge(a, b) {
    const n = a.length, m = b.length
    let c = [], p = 0, q = 0

    while (p < n && q < m) {
        c.push((a[p] < b[q]) ? a[p++] : b[q++])
    }

    /* either sorted array `a` or `b` must be empty and the other with at least one element */
    sorted_subarray = [...c, ...a.slice(p, n), ...b.slice(q, m)]

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += 'Merged Subarray:'
        for (let i = 0; i < sorted_subarray.length; i++) {
            document.getElementById('output').innerHTML += ' ' + sorted_subarray[i]
        }
        document.getElementById('output').innerHTML += '<br>'
    }

    return sorted_subarray
}

module.exports = {
    bubble: bubble_sort, 
    merge: merge_sort
}

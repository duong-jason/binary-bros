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
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML = message
        }
        throw new RangeError(message)
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            output += `${i+1})` + prettify(arr, j, (arr[j] > arr[j+1]) ? 'red' : 'green') + '<br>'
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        output += '<br>'
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
        throw new RangeError(`Expected size=${n}, Got size=${arr.length}`)
    }

    // either one element from split or input array with less than 1 element
    if (n <= 1) {
        return arr
    }

    let a = arr.slice(0, Math.floor(n/2))
    let b = arr.slice(Math.floor(n/2))

    console.log('Split Array:', a, b)
    return merge(merge_sort(a), merge_sort(b))
}

function merge(a, b) {
    const n = a.length, m = b.length
    let c = [], left = 0, right = 0

    while (left < n && right < m) {
        c.push((a[left] < b[right]) ? a[left++] : b[right++])
    }

    console.log(`Merged Subarray:`, [...c, ...a.slice(left, n), ...b.slice(right, m)])

    // either sorted array `a` or `b` must be empty and the other with at least one element
    return [...c, ...a.slice(left, n), ...b.slice(right, m)]
}

module.exports = {
    bubble: bubble_sort, 
    merge: merge_sort
}

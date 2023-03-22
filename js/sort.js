function prettify(arr, start, color) {
    return (
        arr.slice(0, start).join(' ') +
        `<span style='color: ${color};'> ${arr[start]} ${arr[start+1]} </span>` +
        arr.slice(start+2).join(' ')
    )
}

function bubble_sort(arr, n) {
    var output = ''

    // FIXME: Expected size=, Got size=1
    // Happens when correct input to 'element' field but 'size' field wasn't specified
    if (n === "") n = null

    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            output += `${i+1}) ` + prettify(arr, j, (arr[j] > arr[j+1]) ? 'Tomato' : 'MediumSeaGreen') + '<br>'
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        output += `Result: ${arr.join(' ')}<br>`
    }
    /* istanbul ignore next */
    if (document.getElementById('output_1')) {
        document.getElementById('output_1').innerHTML = output + `Sorted Array ${arr.join(' ')}`
    }
    return arr
}

function merge_sort(arr, n=null) {
    // FIXME: Expected size=, Got size=1
    // Happens when correct input to 'element' field but 'size' field wasn't specified
    if (n === "") {
        n = null
    } else if (n === null) {
        n = arr.length
    }

    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    }

    let result = null

    /* either one element from split or input array with less than 1 element */
    if (n <= 1) {
        result = arr
    } else {
        const mid = Math.floor(n/2)
        let left = arr.slice(0, mid)
        let right = arr.slice(mid)

        /* istanbul ignore next */
        if (document.getElementById('output_2')) {
            document.getElementById('output_2').innerHTML += 'Split Array: ' + prettify(arr, mid-1, 'Tomato') + '<br>'
        }

        result = merge(merge_sort(left), merge_sort(right))
    }

    /* istanbul ignore next */
    if (document.getElementById('output_2')) {
        document.getElementById('output_2').innerHTML += 'Merged Array: ' + result.join(' ') + '<br>'
    }

    return result
}

function merge(a, b) {
    const n = a.length, m = b.length
    let c = [], p = 0, q = 0

    while (p < n && q < m) {
        c.push((a[p] < b[q]) ? a[p++] : b[q++])
    }

    /* either sorted array `a` or `b` must be empty and the other with at least one element */
    return [...c, ...a.slice(p, n), ...b.slice(q, m)]
}

module.exports = {
    bubble: bubble_sort, 
    merge: merge_sort
}

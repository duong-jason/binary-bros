function prettify(arr, start, color) {
    return (
        arr.slice(0, start).join(' ') +
        `<span style='color: ${color};'> ${arr[start]} ${arr[start+1]} </span>` +
        arr.slice(start+2).join(' ')
    )
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
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML += 'Split Array: ' + prettify(arr, mid-1, 'Tomato') + '<br>'
        }

        result = merge(merge_sort(left), merge_sort(right))
    }

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += 'Merged Array: ' + result.join(' ') + '<br>'
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

// O(n)
function optimal_third_max(arr, n) {
    if (n === "") {
       n = null
    }

    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    } else if (n < 3) {
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML = `Third Max Element: None`
        }
        return null
    }

    f_max = Number.NEGATIVE_INFINITY
    s_max = Number.NEGATIVE_INFINITY
    t_max = Number.NEGATIVE_INFINITY

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= f_max) {
            t_max = s_max, s_max = f_max, f_max = arr[i]
        } else if (arr[i] >= s_max) {
            t_max = s_max, s_max = arr[i]
        } else if (arr[i] >= t_max) {
            t_max = arr[i]
        }
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML += `${i+1}) First Max: ${f_max}, Second Max: ${s_max}, Third Max: ${t_max}<br>`
        }
    }

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += `Third Max Element: ${t_max}`
    }

    return t_max
}

// O(nlogn)
function naive_third_max(arr, n) {
    if (n === "") {
       n = null
    }

    if (n != arr.length) {
        message = `Expected size=${n ?? "N.A."}, Got size=${arr.length}`
        alert(message)
        throw new RangeError(message)
    } else if (n < 3) {
        /* istanbul ignore next */
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML = `Third Max Element: None`
        }
        return null
    }

    const sorted_arr = merge_sort(arr, n)
    const t_max = sorted_arr[sorted_arr.length-3]

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML += `Third Max Element: ${t_max}`
    }

    return t_max
}

module.exports = {
    naive_third_max,
    optimal_third_max
}
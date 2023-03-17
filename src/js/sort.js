function bubble_sort(arr, n) {
    console.log(arr)
    if (n != arr.length) {
        // throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
        document.getElementById('output').innerHTML = `Expected n=${arr.length}, Got n=${n}`
        return
    }

    var output = ''

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
            output += `${i+1}) ${arr}<br>`
        }
    }
    output += `Sorted Array ${arr}`
    document.getElementById('output').innerHTML = output
}

function merge_sort(arr, n=null) {
    if (n === null) {
        n = arr.length
    } else if (n != arr.length) {
        throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
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

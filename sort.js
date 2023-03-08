function bubble_sort(arr, n) {
    if (arr.length !== n) {
        throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
    }

    for (let i = 0; i < n-1; i++) {
        console.log(`Iteration ${i+1}`)
        for (let j = 0; j < n-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
            console.log(arr)
        }
    }
    return arr
}

function merge_sort(arr, n=null) {
    if (n === null) {
        n = arr.length
    } else if (arr.length !== n) {
        throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
    }

    if (n <= 1) { // either one element from split or input arr with less than 1 element
        return arr
    }

    let a = arr.slice(0, Math.floor(n/2))
    console.log('Split Array:', a)

    let b = arr.slice(Math.floor(n/2))
    console.log('Split Array:', b)

    return merge(merge_sort(a), merge_sort(b))
}

function merge(a, b) {
    const n = a.length, m = b.length
    let c = [], left = 0, right = 0

    while (left < n && right < m) {
        c.push((a[left] <= b[right]) ? a[left++] : b[right++])
    }

    console.log(`Merged Subarray:`, [...c, ...a.slice(left, n), ...b.slice(right, m)])

    // either array a or b must be empty and the other with at least one element
    return [...c, ...a.slice(left, n), ...b.slice(right, m)]
}

var arr = [5, 2, 3, 9, 1, 12]
console.log('[Bubble Sort]:', arr)
console.log(`Sorted Array: ${bubble_sort(arr, 6)}\n`)

var arr = [5, 2, 3, 9, 1, 12]
console.log('[Merge Sort]:', arr)
console.log(`Sorted Array: ${merge_sort(arr, 6)}\n`)

module.exports = {
    bubble: bubble_sort, 
    merge: merge_sort
}

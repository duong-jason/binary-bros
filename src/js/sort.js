function bubble_sort() {
    const input = document.getElementById('elements').value;
    const n = document.getElementById('size').value;

    var arr = []
    let output = '';
    for (let i = 0; i < input.length; i++) {
        arr.push(input[i])
    }

    if (arr.length != n) {
        output += 'Invalid size or elements.' + '<br>' + 'Try again...' + '<br>';
        //throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
    }
    else {
        for (let i = 1; i < n; i++) {
            output += `Iteration ${i}` + '<br>';
            for (let j = 0; j < n-1; j++) {
                if (arr[j] > arr[j+1]) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                }
                output += arr + '<br>';
            }
        }
        output += 'Sorted Array: ' + arr + '<br>';
    }

    document.getElementById('bs-output').innerHTML = output;
}

function merge_sort(arr, n=null) {
    if (n === null) {
        n = arr.length
    } else if (arr.length != n) {
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

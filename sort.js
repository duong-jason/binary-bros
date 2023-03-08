function bubble_sort(arr, n) {
	if (arr.length !== n) {
		throw new RangeError(`Expected n=${arr.length}, Got n=${n}`)
	}

	for (let i = 0; i < n-1; i++) {
	    // console.log(`"Iteration ${i+1}`)
		for (let j = 0; j < n-1; j++) {
			if (arr[j] > arr[j+1]) {
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]]
			}
		    // console.log(arr)
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
	let a = merge_sort(arr.slice(0, Math.floor(n/2)))
	let b = merge_sort(arr.slice(Math.floor(n/2)))
	return merge(a, b)
}

function merge(a, b) {
	const n = a.length, m = b.length
	let c = [], left = 0, right = 0

	while (left < n && right < m) {
		c.push((a[left] < b[right]) ? a[left++] : b[right++]);
	}

	// either array a or b must be empty and the other with at least one element
	return [...c, ...a.slice(left, n), ...b.slice(right, m)];
}

module.exports = {
    bubble: bubble_sort, 
    merge: merge_sort
}

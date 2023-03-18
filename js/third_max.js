function find_third_max(arr, n) {
    if (n != arr.length) {
        message = `Expected size=${n}, Got size=${arr.length}`
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
    }

    /* istanbul ignore next */
    if (document.getElementById('output')) {
        document.getElementById('output').innerHTML = `Third Max Element: ${t_max}`
    }

    return t_max
}

module.exports = find_third_max

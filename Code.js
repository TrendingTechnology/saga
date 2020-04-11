// Testing

var min, max, incr

min = 1,
    max = 100,
    incr = 2

for (let i = min; i <= max; i++) {
    console.log(code(i))
}

/**
* / Generate a numeric code for each number /
* Notation:
* *| -> Separates items to be multiplied, in this order
* *:k -> Denotes the kth prime number n, if n happens to be prime
* *a^b -> Denotes a number n of that form, where a & b are integers
* *k.a^b -> Denotes a number n of that form, where a, b & k are integers
* If n is neither of the above, split n into its desired factors and recurse
* */

function code(n) {
    var factors = getPrimes(n)
    var dict = new Counter(factors)

    var primes = [], powers = []
    for (var i in dict) {
        primes.push(parseInt(i))
        powers.push(dict[i])
    }

    if (n <= 16) {
        return n.toString()
    } else if (isPrime(n)) {
        return isPrime(n)
    } else if (isPower(n)) {
        return isPower(n)
    }
    else {
        var factors = chooseFactors(n)
            || getPrimes(n),
            out = []

        factors = simplify(factors)

        for (var i in factors) {
            out.push(code(factors[i]))
        }

        return out.join('|')
    }
}

/**
* Choose one array where
* * its length should not be more than the digit length; and
* * whose average is closest to the log base 10 of that number
* */

function chooseFactors(x) {
    var combi = getFactorSets(x),
        con = Math.ceil(Math.log10(x)),
        aver = []
    combi = combi.filter(arr => arr.length < 1 + con)

    for (var i in combi) {
        aver.push(Math.round(avg(combi[i])))
    }

    return combi[aver.indexOf(closest(aver, con))]
}

/**
* Generate all combinations of factors, as arrays, that
* satisfy the following conditions
* * The product of all elements must equal the number in the argument
* * An array should not begin with 1 and neither have length 1
* If the number has more factors than its digit length l
* * Pick the median and the l elements on either side and repeat
* */

function getFactorSets(x) {
    var factors = getFactors(x)
    const len = x.toString(10).length
    const n = Math.round(Math.pow(x, 1 / len))

    if (factors.length > n) {
        factors = getMedians(factors, n)
    }

    var combs = combinations(factors, len)

    const product = xs => xs.reduce((a, x) => a * x, 1)
    combs = combs.filter(arr => product(arr) == x)

    combs = combs.filter(arr => arr[0] != 1)
    combs = combs.filter(arr => arr.length != 1)

    return combs
}

function getFactors(n) {
    var factors = []
    for (var i = 1; i <= n; i++) {
        if (n % i == 0) factors.push(i)
    }
    return factors
}

function getPrimes(n) {
    var i = 2, factors = []

    while (Math.pow(i, 2) <= n) {
        if (n % i) { i += 1 }
        else {
            n = Math.floor(n / i)
            factors.push(i)
        }
    }

    if (n > 1) factors.push(n)

    return factors
}

function isPrime(n) {
    var f = 2
    while (f * f <= n) {
        if (n % f == 0) return null
        f += 1
    }
    return `:${pi(n)}`
}

function isPower(n) {
    var factors = getPrimes(n)
    var dict = new Counter(factors)

    const product = xs => xs.reduce((a, x) => a * x, 1)

    var primes = [], powers = []
    for (var i in dict) {
        primes.push(parseInt(i))
        powers.push(dict[i])
    }

    if (set(powers).length == 1 && product(powers) != 1) {
        var p = powers[0], n = product(primes)
        return `${n}^${p}`
    }
    return null
}

function factorize(n) {
    var factors = getPrimes(n)
    var dict = new Counter(factors)

    var primes = [], powers = []
    for (var i in dict) {
        primes.push(parseInt(i))
        powers.push(dict[i])
    }

    var foo = []
    for (i in primes) {
        if (powers[i] == 1) foo.push(primes[i].toString())
        else foo.push(`${primes[i]}^${powers[i]}`)
    }
    res = foo.join('*')

    // Exceptions
    if (n == 0 || n == 1) {
        throw new RangeError(`${n} must not be below one`)
    } else if (n % 1 != 0) {
        throw new RangeError(`${n} is not an integer greater than 1`)
    } else if (Math.sign(n) == -1) {
        throw new RangeError(`${n} must not be negative`)
    }

    return res
}

function pi(num) {
    var primes = [], numbers = Array(num).fill(true)
    for (var i = 2; i < num; i++) {
        if (numbers[i]) {
            primes.push(i)
            for (var n = i * i; n < num; n += i) {
                numbers[n] = false
            }
        }
    }
    return primes.length + 1
}

function Counter(array) {
    array.forEach(val => this[val] = (this[val] || 0) + 1);
}

function set(arr) {
    return arr.reduce(function (a, val) {
        if (a.indexOf(val) === -1) {
            a.push(val)
        }
        return a
    }, [])
}

/**
* Pass an array of length k.
* If any element in array has the product of a number n <= 16,
* remove and replace it with the product
* */

function simplify(a) {
    const product = xs => xs.reduce((a, x) => a * x, 1)

    var combs = combinations(a), products = [], avgs = [],
        con = Math.ceil(Math.log10(product(a)))

    combs = combs.filter(arr => product(arr) <= 16
        && arr.length > 1)

    if (combs.length < 1) {
        return a
    } else {
        for (i in combs) {
            products.push(product(combs[i]))
            avgs.push(Math.round(avg(combs[i])))
        }

        toRemove = combs[avgs.indexOf(closest(avgs, con))]
        a = a.filter((el) => !toRemove.includes(el));
        a = a.concat(product(toRemove))

        return a
    }
}

/**
* Pass in an array of length k. By default, the median should be returned.
* The median itself can either be one or two values.
* If l > 0, function will splice the first and last floor(k/2)-l values
* */

function getMedians(a, l = 0) {
    const mid = Math.ceil(a.length / 2);
    const median = a.length % 2 == 0 ? [a[mid - 1], a[mid]] : [a[mid - 1]];

    if (l > Math.floor(a.length / 2)) { return a }
    else if (a.length == 1) { return a }
    else {
        a = a.filter(e => !median.includes(e))
        half = Math.floor(a.length / 2)
        b = a.slice(0, half)
        c = a.slice(half, a.length)

        d = b.slice(b.length - l, b.length)
        e = c.slice(0, l)

        f = [...d, ...median, ...e]
    }
    return f
}

function check(l) {
    for (var i = 16; i > 2; i--) {
        if (l % i == 0) return i
    }
}

function closest(array, num) {
    var i = 0;
    var minDiff = 1000;
    var ans;
    for (i in array) {
        var m = Math.abs(num - array[i]);
        if (m < minDiff) {
            minDiff = m;
            ans = array[i];
        }
    }
    return ans;
}

function combinations(list) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize);

    for (var i = 1; i < combinationsCount; i++, set.push(combination))
        for (var j = 0, combination = []; j < listSize; j++)
            if ((i & (1 << j)))
                combination.push(list[j]);
    return set;
}

function avg(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt)
}
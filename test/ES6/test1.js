'use strict';
let fib = (n) => {
    if (n <= 1) {
        return n;
    } else {
        //不会被优化，因为执行了fib() 后汗执行了加法
        return n + fib(n - 1)
    }
}


//优化后的方法
fib = (n, p) => {
    p = (typeof(p) == 'undefined')? 0 : p;
    if (n <= 1) {
        return n + p
    } else {
        let result = n + p;
        return fib(n-1, result)
    }
}

//n: 1    return 1 + 0
//n: 2    return fib(1, 2[2 + 0])  -->  fib(1, 2)   -->  3
//n: 3    return fib(2, 3)  --> fib(1, 5)  --> 6
//n: 4    return fib(3, 4)  ---> fib(2, 7)  --> fib(1, 8) -- 10
console.log(fib(10953));
function rombergIntegration(f, a, b, epsilon) {
    if (!(f instanceof Function)) {
        throw "f is not a func";
    }
    const T = [];
    if (T[0] === undefined) {
        T[0] = [];
    }
    T[0][0] = (b - a) / 2 * (f(a) + f(b));
    let k = 1;

    while (true) {
        let S = 0;
        const end = Math.pow(2, k - 1);
        for (let i = 1; i <= end; i++) {
            S += f(a + (2 * i - 1) * (b - a) / Math.pow(2, k));
        }

        T[0][k] = 1 / 2 * (T[0][k - 1] + (b - a) / Math.pow(2, k - 1) * S)
        for (let m = 1; m <= k; m++) {
            if (T[m] === undefined) {
                T[m] = [];
            }
            T[m][k - m] = (Math.pow(4, m) * T[m - 1][k - m + 1] - T[m - 1][k - m]) / (Math.pow(4, m) - 1);
        }
        if (Math.abs(T[k][0] - T[k - 1][0]) < epsilon) {
            return T[k][0];
        } else {
            k += 1;
        }
    }
}

// 测试函数
const testFunctions = {
    linear: x => 2 * x + 1, // 线性函数: f(x) = 2x + 1
    quadratic: x => x ** 2, // 二次函数: f(x) = x^2
    exponential: x => Math.exp(x), // 指数函数: f(x) = e^x
    sinusoidal: x => Math.sin(x) // 正弦函数: f(x) = sin(x)
};

// 测试Romberg积分法
const testRombergIntegration = (func, from, to, tol) => {
    console.log(`Romberg积分结果（${func.name} 在 [${from}, ${to}]）: `, rombergIntegration(func, from, to, tol));
};

// 测试不同的函数和区间
testRombergIntegration(testFunctions.linear, 0, 1, 1e-5);
testRombergIntegration(testFunctions.quadratic, 0, 1, 1e-5);
testRombergIntegration(testFunctions.exponential, 0, 1, 1e-5);
testRombergIntegration(testFunctions.sinusoidal, 0, Math.PI, 1e-5);

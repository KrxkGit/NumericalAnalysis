/**
 * 自动选取步长梯形法
 */

function trapezoidalRule(a, b, epsilon, f) {
    if (!(f instanceof Function)) {
        throw "f is not a function";
    }
    const h = (b - a) / 2;
    let n = 1;
    let T1 = (f(a) + f(b)) * h;

    while (true) {
        let T0 = T1;
        let S = 0;

        for (let k = 1; k <= n; k++) {
            S += f(a + (2 * k - 1) * h / n);
        }
        T1 = T0 / 2 + S * h / n;

        if (Math.abs(T0 - T1) < 3 * epsilon) {
            return T1;
        } else {
            n *= 2;
        }
    }
}

/**
 * 测试数据和函数
 * @type {{exponential: (function(*): number), linear: (function(*): *), quadratic: (function(*): *), sinusoidal: (function(*): number)}}
 */
const testFunctions = {
    linear: x => 2 * x + 1, // 线性函数: f(x) = 2x + 1
    quadratic: x => x ** 2, // 二次函数: f(x) = x^2
    exponential: x => Math.exp(x), // 指数函数: f(x) = e^x
    sinusoidal: x => Math.sin(x) // 正弦函数: f(x) = sin(x)
};

// 测试自动选取步长梯形法
const testIntegration = (func, from, to) => {
    console.log(`集成结果（${func.name} 在 [${from}, ${to}]）: `, trapezoidalRule(from, to, 1e-5, func));
};

// 测试不同的函数和区间
testIntegration(testFunctions.linear, 0, 1);
testIntegration(testFunctions.quadratic, 0, 2);
testIntegration(testFunctions.exponential, 0, 1);
testIntegration(testFunctions.sinusoidal, 0, Math.PI);

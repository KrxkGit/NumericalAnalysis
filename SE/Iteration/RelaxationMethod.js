/**
 * 松弛法求解 f(x) = 0
 * @param x0 迭代初值
 * @param epsilon 容忍极限
 * @param f 函数 f
 * @param df 函数 f 的导函数
 * @param M 最大迭代次数
 * @returns {number} f(x) = 0 的解
 */
function RelaxationMethod(x0, epsilon, f, df, M) {
    let k = 0;
    let xk = x0;

    while (true) {
        let omega_k = 1 / (1 - df(xk));
        let xk_new = (1 - omega_k) * xk + omega_k * f(xk);

        if (k > M) {
            throw `超出最大迭代次数。最后迭代结果: ${xk_new}`;
        }

        if (Math.abs(xk_new - xk) <= epsilon) {
            console.log(`迭代次数: ${k}`);
            return xk_new;
        } else {
            k++;
            xk = xk_new;
        }
    }
}

function test() {
    let f = function (x) {
        return x ** 2 - 95;
    }
    let df = function (x) {
        return 2 * x;
    }
    const res = RelaxationMethod(5, 1e-8, f, df, 10);
    console.log(res);
}

test();

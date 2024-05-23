/**
 * 二分法求解 f(x) = 0
 * @param delta δ 值，可接受的最小与 x 轴的偏差
 * @param epsilon 可容忍的最大区间长度
 * @param f 函数 f
 * @param a 求解区间左端点
 * @param b 求解区间右端点
 * @returns {number} 解的横坐标
 */
function Dichotomy(delta, epsilon, f, a, b) {
    let ak = a, bk = b, k = 0;
    while (true) {
        let xk = (ak + bk) / 2;
        let value = f(xk);

        if (bk - ak <= epsilon) { // 区间长度在容忍范围内，直接取中点
            delta = (ak + bk) / 2;
            console.log(`ξ = ${delta}`)
            return delta;
        }
        k++;

        // 根据零点存在定理求解
        if (Math.abs(value) < delta) {
            // f(xk) = 0 成立
            console.log(`迭代次数: ${k}`);
            return xk;
        } else if(f(ak) * f(xk) < 0) { // 零点在左区间
            bk = xk;
            continue;
        } else { // 零点在右区间
            ak = xk;
            continue;
        }
    }
}

function test() {
    let f = function (x) {
        return x + 2;
    }

    let res = Dichotomy(1e-8, 1e-5,f, -10, 10);
    console.log(res);
}

test();

/**
 * 求 拉格朗日 n 次插值
 * @param x_arr x 已知点
 * @param y_arr y 已知点
 * @param x 插值处 x 的值
 * @constructor
 */
function Lagrange(x_arr, y_arr, x) {
    if (!(x_arr instanceof Array && y_arr instanceof Array)) {
        throw "非法参数";
    }
    const lk = prefetchLk(x_arr, x);
    let save = 0;
    const len = y_arr.length;
    if (len != x_arr.length) {
        throw "x 与 y 不等长";
    }
    for (let i = 0; i < len; i++) {
        save += lk[i] * y_arr[i];
    }
    return save;
}

// 缓存 lk(x)
function prefetchLk(x_arr, x) {
    const k_max = x_arr.length - 1;
    const lk = [];
    for (let i = 0; i <= k_max; i++) {
        lk[i] = Lk(i, x_arr, x);
    }
    return lk;
}

// lk(x)
function Lk(k, x_arr, x) {
    const n = x_arr.length;

    let res = 1;
    for (let i = 0; i < n; i++) {
        if (i == k) {
            continue;
        }
        res *= (x- x_arr[i]) / (x_arr[k] - x_arr[i]);
    }
    return res;
}


function test() {
    console.log(Lagrange([1,2,3],[2,2,2], 1));
}

test();

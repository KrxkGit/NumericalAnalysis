/**
 * 自然边界条件：最简单的边界条件，它要求两端点的二阶导数为零。这意味着在两端点处曲线的弯曲程度为零，即曲线在两端点处的弯曲程度最小。
 * 固定边界条件：在这种情况下，曲线在两端点处的二阶导数（即曲率）被指定为已知值。这可以用来匹配特定的曲率要求或者给定的斜率条件。
 * @type {{"Natural boundary conditions": number, "Fixed boundary conditions": number}}
 */
const boundary_scheme = {
    'Natural boundary conditions' : 0,
    'Fixed boundary conditions' : 1,
};

function CubicSpline(x_arr, y_arr, xx, boundary_selection) {
    const n = x_arr.length - 1;
    const h = [];
    for (let i = 0; i <= n - 1; i++) {
        h[i] = x_arr[i + 1] - x_arr[i];
    }

    // 计算 \alpha_{i} & \beta_{i}
    const alpha = [];
    const beta = [];

    switch (boundary_selection["selection"]) {
        case boundary_scheme["Natural boundary conditions"]:
            alpha[0] = 1;
            beta[0] = 3 / h[0] * (y_arr[1] - y_arr[0]);
            alpha[n] = 0;
            beta[n] = 3 / h[n - 1] * (y_arr[n] - y_arr[n - 1]);
            break;
        case boundary_scheme["Fixed boundary conditions"]:
            alpha[0] = 0;
            alpha[n] = 1;
            beta[0] = 2 * boundary_selection["attach"]["m0"];
            beta[n] = 2 * boundary_selection["attach"]["mn"];
            break;
    }

    for (let i = 1; i <= n - 1; i++) {
        alpha[i] = h[i - 1] / (h[i - 1] + h[i]);
        beta[i] = 3 * ((1 - alpha[i]) / h[i - 1] * (y_arr[i] - y_arr[i - 1]) +
            alpha[i] / h[i] * (y_arr[i + 1] - y_arr[i]));
    }

    // 计算 a_i & b_i
    const a = [];
    const b = [];
    a[0] = -alpha[0] / 2;
    b[0] = beta[0] / 2;

    for (let i = 1; i <= n; i++) {
        a[i] = -alpha[i] / (2 + (1 - alpha[i]) * a[i - 1]);
        b[i] = (beta[i] - (1 - alpha[i]) * b[i - 1]) / (2 + (1 - alpha[i]) * a[i - 1]);
    }

    // 计算 m_i
    const m = [];
    m[n] = b[n];
    for (let i = n - 1; i >= 0; i--) {
        m[i] = a[i] * m[i + 1] + b[i]
    }

    // 判断 xx 所在的 [x_i, x_{i+1}]的区间，暂时采用暴力遍历法，可考虑二分查找优化
    let yy = 0;
    const s = function (i) {
        let res = (1 + 2 * (xx - x_arr[i]) / (x_arr[i + 1] - x_arr[i])) *
            Math.pow((xx - x_arr[i + 1]) / (x_arr[i] - x_arr[i + 1]), 2) * y_arr[i] +
            (1 + 2 * (xx - x_arr[i + 1]) / (x_arr[i] - x_arr[i + 1])) *
            Math.pow((xx - x_arr[i]) / (x_arr[i + 1] - x_arr[i]), 2) * y_arr[i + 1] +
            (xx - x_arr[i]) * Math.pow((xx - x_arr[i + 1]) / (x_arr[i] - x_arr[i + 1]), 2) * m[i] +
            (xx - x_arr[i + 1]) * Math.pow((xx - x_arr[i]) / (x_arr[i + 1] - x_arr[i]),2) * m[i + 1];

        return res;
    }
    for (let i = 0; i <= n - 1; i++) {
        if (xx >= x_arr[i] && xx <= x_arr[i + 1]) {
            //console.log(`所在区间 ${i}`)
            yy = s(i);
            break;
        }
    }
    return yy;
}

// 使用样条插值函数
const xData = [1, 2, 3, 4, 5, 6];
const yData = [1, 4, 9, 16, 25, 36];
// yData.forEach((value, index) => {
//     yData[index] = value * 2 + 2;
// })
const testX = 2.5; // 测试点
const bound_selection = {"selection" : boundary_scheme["Natural boundary conditions"]};
const interpolatedY = CubicSpline(xData, yData, testX, bound_selection);
console.log(`在 x = ${testX} 处的插值结果是: y = ${interpolatedY}`);
